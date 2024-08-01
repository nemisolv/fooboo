//package com.facebook.config;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.http.server.ServerHttpRequest;
//import org.springframework.http.server.ServerHttpResponse;
//import org.springframework.web.socket.WebSocketHandler;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.server.HandshakeInterceptor;
//import java.util.Map;
//
//public class UserHandshakeInterceptor implements HandshakeInterceptor {
//
//
//    @Override
//    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
//        String userId = request.getHeaders().getFirst("userId");
//        if (userId != null) {
//            // Store the userId in the WebSocket session attributes
//            attributes.put("userId", userId);
//            return true; // Allow the handshake
//        }
//        // Reject the handshake if userId is not present
//        return false;
//    }
//
//    @Override
//    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
//
//    }
//}
