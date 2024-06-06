package io.cynicdog.User;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDateTime;
import java.util.Map;

@Path("/api/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService userService;

    @POST
    @Path("/sign-in")
    @Transactional
    public void signIn(Map<String, String> payload) {

        User user = userService.findByUsername(payload.get("username"));
        user.setAvatarUrl(payload.get("avatar_url"));
        user.setGithubHome(payload.get("github_home"));

        user.addSignInHistory(LocalDateTime.now());

        userService.save(user);
    }

    @GET
    @Path("/{username}")
    public Response find(@PathParam("username") String username) {

        var found = userService.findByUsername(username);

        return Response.ok(found).build();
    }
}
