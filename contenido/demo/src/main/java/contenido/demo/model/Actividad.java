package contenido.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "actividades")
public class Actividad {

    @Id
    private String id;

    private String idUsuario;
    private String tipo;            // PUBLICACION, COMENTARIO, REACCION
    private String referenciaId;    // idPublicacion o idComentario o idReaccion
    private LocalDateTime fecha = LocalDateTime.now();
}
