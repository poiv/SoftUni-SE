package com.plannerapp.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity{

    @Column(nullable = false)
    @Size(min = 2, max = 50)
    private String description;

    @Future
    @Column(nullable = false)
    private LocalDate dueDate;

    @ManyToOne
    @NotNull
    private Priority priority;

    @ManyToOne
    private User assignee;

    public @Size(min = 2, max = 50) String getDescription() {
        return description;
    }

    public void setDescription(@Size(min = 2, max = 50) String description) {
        this.description = description;
    }

    public @Future LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(@Future LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }
}
