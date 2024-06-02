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
                     @ConfigProperty(name="archeio.admin.uuid") String adminUUID) {

        // register logging filter
        router.route().handler(ctx -> {
            logger.info("Request path: " + ctx.request().path());
            ctx.next();
        });

        var adminAPI = new AdminAPI(vertx, adminUUID);

        router.get("/admin/:uuid").handler(adminAPI::grantPermission);
    }
}
