package io.cynicdog;

import io.vertx.core.MultiMap;
import io.vertx.core.Vertx;
import io.vertx.core.http.Cookie;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.oauth2.OAuth2Auth;
import io.vertx.ext.auth.oauth2.OAuth2AuthorizationURL;
import io.vertx.ext.auth.oauth2.OAuth2Options;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.client.WebClient;
import org.jboss.logging.Logger;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;

import static io.cynicdog.util.SecureStringUtil.generateRandomString;

public class GithubAPI {

    static final Logger logger = Logger.getLogger(GithubAPI.class);
    public static final String stateKey = "STATE";

    final Vertx vertx;
    final String CLIENT_ID;
    final String CLIENT_SECRET;
    final String redirectUri;
    final OAuth2Options credentials;
    final String host;
    final int port;

    public GithubAPI(Vertx vertx, String CLIENT_ID, String CLIENT_SECRET, String redirectionUrl, String host, int port) {
        this.vertx = vertx;
        this.CLIENT_ID = CLIENT_ID;
        this.CLIENT_SECRET = CLIENT_SECRET;
        this.credentials = new OAuth2Options()
                .setSite("https://github.com/login")
                .setTokenPath("/oauth/access_token")
                .setAuthorizationPath("/oauth/authorize")
                .setClientId(CLIENT_ID)
                .setClientSecret(CLIENT_SECRET);
        this.redirectUri = redirectionUrl;

        this.host = host;
        this.port = port;
    }

    public void signIn(RoutingContext ctx) {
        OAuth2Auth oauth2Provider = OAuth2Auth.create(vertx, credentials);

        String state = generateRandomString(16);
        String authorizationUri = oauth2Provider.authorizeURL(
                new OAuth2AuthorizationURL()
                        .setRedirectUri(redirectUri)
                        .setScopes(Arrays.asList("read:user", "user:email"))
                        .setState(state));

        ctx.response()
                .addCookie(Cookie.cookie(stateKey, state))
                .putHeader("Location", authorizationUri)
                .setStatusCode(302).end();
    }

    public void callback(RoutingContext ctx) {
        String code = ctx.request().getParam("code");
        String state = ctx.request().getParam("state");

//         String storedState = ctx.request().getCookie(stateKey).getValue();

//        if (state == null || !state.equals(storedState)) {
//            ctx.response()
//                    .putHeader("Location", "/#state_mismatch")
//                    .setStatusCode(302)
//                    .end();
//        }
//        else {
//            ctx.response().removeCookie(stateKey);

            WebClient client = WebClient.create(ctx.vertx());

            var tokenFuture = getGithubAccessToken(client, code);
            tokenFuture
                    .thenAccept(result -> handleTokenSuccess(ctx, client, result))
                    .exceptionally(ex -> handleTokenFailure(ctx, ex));
//        }
    }

    private CompletableFuture<JsonObject> getGithubAccessToken(WebClient client, String code) {
        CompletableFuture<JsonObject> tokenFuture = new CompletableFuture<>();

        client.postAbs("https://github.com/login/oauth/access_token")
                .putHeader("Content-Type", "application/x-www-form-urlencoded")
                .putHeader("Accept", "application/json")
                .sendForm(MultiMap.caseInsensitiveMultiMap()
                        .set("client_id", CLIENT_ID)
                        .set("client_secret", CLIENT_SECRET)
                        .set("code", code)
                        .set("redirect_uri", redirectUri), ar -> {
                    if (ar.succeeded()) {
                        tokenFuture.complete(ar.result().bodyAsJsonObject());
                    } else {
                        tokenFuture.completeExceptionally(ar.cause());
                    }
                });

        return tokenFuture;
    }

    private CompletableFuture<JsonObject> getGithubUserInfo(WebClient client, String accessToken) {
        CompletableFuture<JsonObject> userInfoFuture = new CompletableFuture<>();

        client.getAbs("https://api.github.com/user")
                .putHeader("Authorization", "Bearer " + accessToken)
                .putHeader("User-Agent", "Vertx-OAuth2-App")
                .send(ar -> {
                    if (ar.succeeded()) {
                        userInfoFuture.complete(ar.result().bodyAsJsonObject());
                    } else {
                        userInfoFuture.completeExceptionally(ar.cause());
                    }
                });

        return userInfoFuture;
    }

    private void handleTokenSuccess(RoutingContext ctx, WebClient client, JsonObject tokenResponse) {
        String accessToken = tokenResponse.getString("access_token");

        var userInfoFuture = getGithubUserInfo(client, accessToken);
        userInfoFuture.thenAccept(userInfo -> {

            logger.info(userInfo.encodePrettily());

            String githubUserId = userInfo.getString("id");
            String githubUsername = userInfo.getString("login");
            String githubAvatar = userInfo.getString("avatar_url");

            WebClient.create(ctx.vertx())
                    .post(port, host, "/user/sign-in?type=github")
                    .sendJsonObject(new JsonObject()
                            .put("userId", githubUserId)
                            .put("username", githubUsername)
                            .put("avatar_url", githubAvatar));

            logger.info(userInfo.encodePrettily());

            ctx.response()
                    .setStatusCode(302)
                    .putHeader("Location", "/")
                    .addCookie(Cookie.cookie("access_token", accessToken))
                    .addCookie(Cookie.cookie("github_username", githubUsername.replaceAll("\\s", "_")))
                    .addCookie(Cookie.cookie("github_user_id", githubUserId))
                    .addCookie(Cookie.cookie("github_avatar", githubAvatar))
                    .end();

        }).exceptionally(ex -> {
            logger.info("Failed to fetch user info: " + ex.getMessage());
            ctx.response()
                    .putHeader("Location", "/#error=user_info_failed")
                    .setStatusCode(302)
                    .end();

            return null;
        });
    }

    private Void handleTokenFailure(RoutingContext ctx, Throwable ex) {
        logger.error("Failed to obtain access token: " + ex.getMessage());
        ctx.response()
                .putHeader("Location", "/#error=invalid_token")
                .setStatusCode(302)
                .end();
        return null;
    }
}
