package wendorff.cloudyMeter.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import wendorff.cloudyMeter.Config.JwtUtil;
import wendorff.cloudyMeter.Model.LoginRequest;
import wendorff.cloudyMeter.Repository.OrganizationRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final OrganizationRepository orgRepo;
    private final JwtUtil jwtUtil;

    public AuthController(OrganizationRepository orgRepo, JwtUtil jwtUtil) {
        this.orgRepo = orgRepo;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return orgRepo.findByName(request.getName())
                .filter(org -> request.getPassword().equals(org.getPasswordHash())) // sem BCrypt
                .map(org -> {
                    String token = jwtUtil.generateToken(org.getName());
                    return ResponseEntity.ok(Map.of("token", token));
                })
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }
}
