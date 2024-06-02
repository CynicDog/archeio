package io.cynicdog;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

@ApplicationScoped
public class RouterRegistry {

    @Inject
    Vertx vertx;

    static final Logger logger = Logger.getLogger(RouterRegistry.class);

    public void init(@Observes Router router,
                     @ConfigProperty(name="github.app.client.id") String clientId,
                     @ConfigProperty(name="github.app.client.secret") String clientSecret,
                     @ConfigProperty(name="github.app.redirection.url") String redirectionUrl,
                     @ConfigProperty(name="host") String host,
                     @ConfigProperty(name="port") int port) {

        // register logging filter
        router.route().handler(ctx -> {
            logger.info("Request path: " + ctx.request().path());
            ctx.next();
        });

        var githubAPI = new GithubAPI(vertx, clientId, clientSecret, redirectionUrl, host, port);

        router.get("/sign-in").handler(githubAPI::signIn);
        router.get("/callback").handler(githubAPI::callback);
    }
}
