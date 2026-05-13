package contenido.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class PublicacionDTO {

    private String idUsuario;
    private String texto;
    private List<String> multimedia;
}
