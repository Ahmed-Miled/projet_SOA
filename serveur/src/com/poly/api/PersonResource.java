package com.poly.api;

import com.poly.Person;
import com.poly.PersonService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/persons")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PersonResource {

    private PersonService service = new PersonService();

    //  Add person
    @POST
    public Response add(Person p) {
        if (p.getName() == null || p.getName().isEmpty() || p.getAge() <= 0) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Invalid input data")
                    .build();
        }
        return Response.status(Response.Status.CREATED)
                .entity(service.addPerson(p))
                .build();
    }

    //  List all persons
    @GET
    public List<Person> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GET
    @Path("/{id}")
    public Person getById(@PathParam("id") int id) {
        return service.getById(id);
    }

    // Search by name
    @GET
    @Path("/search")
    public List<Person> getByName(@QueryParam("name") String name) {
        return service.getByName(name);
    }

    //  Update person
    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") int id, Person p) {
        Person existing = service.getById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existing.setName(p.getName());
        existing.setAge(p.getAge());
        return Response.ok(service.update(existing)).build();
    }

    //  Delete person
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") int id) {
        boolean deleted = service.delete(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }
}
