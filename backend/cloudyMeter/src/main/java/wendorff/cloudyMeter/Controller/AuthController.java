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
                    String accessToken = jwtUtil.generateToken(org.getName(), 60 * 60 * 1000); // 1h
                    String refreshToken = jwtUtil.generateToken(org.getName(), 7 * 24 * 60 * 60 * 1000); // 7 dias
                    System.out.println(accessToken);
                    System.out.println(refreshToken);
                    return ResponseEntity.ok(Map.of(
                            "accessToken", accessToken,
                            "refreshToken", refreshToken));
                })
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> request) {
        try {
            String refreshToken = request.get("refreshToken");
            String subject = jwtUtil.validateTokenAndGetSubject(refreshToken);
            String newAccessToken = jwtUtil.generateToken(subject, 60 * 60 * 1000); // 1h
            System.out.println(newAccessToken);
            return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid refresh token"));
        }
    }

}
