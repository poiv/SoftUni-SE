package com.plannerapp.model.entity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Table(name = "priorities")
@Entity
public class Priority extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private PriorityLevel name;

    @Column(nullable = false)
    private String description;

    @OneToMany
    private Set<Task> tasks;

    public PriorityLevel getName() {
        return name;
    }

    public void setName(PriorityLevel priorityLevel) {
        this.name = priorityLevel;
        setDescription(priorityLevel);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private void setDescription(PriorityLevel priorityLevel){
        switch (priorityLevel) {
            case LOW:
                this.description = "Should be fixed if time permits but can be postponed.";
            case URGENT:
                this.description = "An urgent problem that blocks the system use until the issue is resolved.";
            case IMPORTANT:
                this.description = "A core functionality that your product is explicitly supposed to perform is compromised.";
        }
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
