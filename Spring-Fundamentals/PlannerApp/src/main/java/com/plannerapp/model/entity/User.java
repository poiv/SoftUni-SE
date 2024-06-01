package com.plannerapp.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends BaseEntity{

    @Column(nullable = false, unique = true)
    @Size(min = 3, max = 20)
    private String username;

    @Column(nullable = false)
    @Size(min = 3, max = 20)
    private String password;

    @Column(nullable = false, unique = true)
    @Email
    private String email;

    @OneToMany(mappedBy = "assignee")
    private Set<Task> assignedTasks;


    public @Size(min = 3, max = 20) String getUsername() {
        return username;
    }

    public void setUsername(@Size(min = 3, max = 20) String username) {
        this.username = username;
    }

    public @Size(min = 3, max = 20) String getPassword() {
        return password;
    }

    public void setPassword(@Size(min = 3, max = 20) String password) {
        this.password = password;
    }

    public @Email String getEmail() {
        return email;
    }

    public void setEmail(@Email String email) {
        this.email = email;
    }

    public Set<Task> getAssignedTasks() {
        return assignedTasks;
    }

    public void setAssignedTasks(Set<Task> assignedTasks) {
        this.assignedTasks = assignedTasks;
    }
}
