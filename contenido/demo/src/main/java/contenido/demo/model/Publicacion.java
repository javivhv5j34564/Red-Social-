package contenido.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "publicaciones")
public class Publicacion {

    @Id
    private String id;

    private String idUsuario;
    private String texto;
    private List<String> multimedia; // URLs de imágenes o vídeos
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}
