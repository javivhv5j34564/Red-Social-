package contenido.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "reacciones")
public class Reaccion {

    @Id
    private String id;

    private String idPublicacion;   // o idComentario si reaccionas a un comentario
    private String idUsuario;
    private String tipo;            // like, me-encanta, etc.
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}
