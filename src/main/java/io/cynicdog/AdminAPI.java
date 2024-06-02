package io.cynicdog;

import io.vertx.core.Vertx;
import io.vertx.core.http.Cookie;
import io.vertx.ext.web.RoutingContext;

public class AdminAPI {

    final Vertx vertx;

    final String adminUUID;

    public AdminAPI(Vertx vertx, String adminUUID) {
        this.vertx = vertx;
        this.adminUUID = adminUUID;
    }

    public void grantPermission(RoutingContext ctx) {

        String uuid = ctx.pathParam("uuid");

        if (adminUUID.equals(uuid)) {
            ctx.response()
                    .addCookie(Cookie.cookie("isAdmin", "true"))
                    .end();
        } else {
            ctx.response().setStatusCode(401).end("Unauthorized");
        }
    }
}
