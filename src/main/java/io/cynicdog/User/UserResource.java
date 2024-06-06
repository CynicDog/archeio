package io.cynicdog.User;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import java.time.LocalDateTime;
import java.util.Map;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService userService;

    @POST
    @Path("/sign-in")
    @Transactional
    public void signIn(Map<String, String> payload) {

        User user = userService.findByUsername(payload.get("username"));
        user.addSignInHistory(LocalDateTime.now());

        userService.save(user);
    }
}
