package f15h.CloudClass.model;

public class ChatJoinMessage{
    private String name;

    public ChatJoinMessage()
    {}
    public ChatJoinMessage(String name){
        this.name = name;
    }
    public String getName()
    {
        return this.name;
    }
    public void setName(String name)
    {
        this.name= name;
    }
}