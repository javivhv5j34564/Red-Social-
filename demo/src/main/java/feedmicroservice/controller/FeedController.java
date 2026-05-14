package feedmicroservice.controller;

import feedmicroservice.model.Comentario;
import feedmicroservice.model.Feed;
import feedmicroservice.model.FeedActividades;
import feedmicroservice.model.FeedPublicaciones;

import feedmicroservice.repository.ActividadesRepository;
import feedmicroservice.repository.ComentarioRepository;
import feedmicroservice.repository.FeedRepository;
import feedmicroservice.repository.PublicacionesRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feed")
public class FeedController {

    private final FeedRepository feedRepo;
    private final ActividadesRepository actRepo;
    private final PublicacionesRepository pubRepo;
    private final ComentarioRepository comRepo;

    public FeedController(
            FeedRepository feedRepo,
            ActividadesRepository actRepo,
            PublicacionesRepository pubRepo,
            ComentarioRepository comRepo) {

        this.feedRepo = feedRepo;
        this.actRepo = actRepo;
        this.pubRepo = pubRepo;
        this.comRepo = comRepo;
    }

    @GetMapping("/{usuarioId}")
    public List<Feed> obtenerFeed(@PathVariable Long usuarioId) {
        return feedRepo.findByUsuarioDestinatario(usuarioId);
    }

    @PostMapping("/actividad")
    public FeedActividades crearActividad(
            @RequestBody FeedActividades actividad) {

        Feed feed = new Feed();

        feed.setUsuarioDestinatario(
                actividad.getFeed().getUsuarioDestinatario());

        feed.setTipo(Feed.TipoFeed.ACTIVIDAD);

        feed = feedRepo.save(feed);

        actividad.setFeed(feed);

        return actRepo.save(actividad);
    }

    @PostMapping("/publicacion")
    public FeedPublicaciones crearPublicacion(
            @RequestBody FeedPublicaciones publicacion) {

        Feed feed = new Feed();

        feed.setUsuarioDestinatario(
                publicacion.getFeed().getUsuarioDestinatario());

        feed.setTipo(Feed.TipoFeed.PUBLICACION);

        feed = feedRepo.save(feed);

        publicacion.setFeed(feed);

        return pubRepo.save(publicacion);
    }

    @PostMapping("/comentario")
    public Comentario crearComentario(
            @RequestBody Comentario comentario) {

        return comRepo.save(comentario);
    }
}