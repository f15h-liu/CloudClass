package f15h.CloudClass.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import f15h.CloudClass.model.ChatJoinMessage;
import f15h.CloudClass.model.ChatGreetingMessage;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

@Controller
public class RoomController{
    private static final Logger logger = LoggerFactory.getLogger(RoomController.class);

    @MessageMapping("/join")
    @SendTo("/channel/broadcast")
    public ChatGreetingMessage sendMessage(@Payload ChatJoinMessage joinMessage)
    {
        
        logger.info(joinMessage.getName());
        return new ChatGreetingMessage("hello " + joinMessage.getName());
    }

}