package CO2015.group9.chatbot.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "answeredQuestions")
public class AnsweredQuestion {
    @Id
    @GeneratedValue(strategy=GenerationType.TABLE)
    @Column(name="answer_id", nullable=false, length=11)
    private int id; // id of the answer
    @Column(name="answer_date", nullable=false)
    private Date date; // date and time they answered

    @ManyToOne
    @JoinColumn(name="answerer", referencedColumnName="id", nullable=false,unique=true)
    private User user;

    // Constructor
    public AnsweredQuestion(int id,Date date, User user){
        this.id = id;
        this.date = date;
        this.user = user;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
