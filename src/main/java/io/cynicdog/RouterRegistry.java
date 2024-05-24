package io.cynicdog;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

@ApplicationScoped
public class RouterRegistry {

    @Inject
    Vertx vertx;

    static final Logger logger = Logger.getLogger(RouterRegistry.class);

    public void init(@Observes Router router) {

        // register logging filter
        router.route().handler(ctx -> {
            logger.info("Request path: " + ctx.request().path());
            ctx.next();
        });
    }
}
