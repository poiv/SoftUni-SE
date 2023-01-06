import java.util.ArrayList;
import java.util.List;

public class SoftUni {
    private int capacity;
    private List<Student> data;

    public SoftUni(int capacity) {
        this.capacity = capacity;
        data = new ArrayList<>();
    }

    public int getCapacity() {
        return capacity;
    }
    public int getCount(){
        return data.size();
    }
    public String insert(Student student){
        Student existent = data.stream()
                .filter(d -> d == student).findFirst().orElse(null);
        if (existent != null){
            return ("Student is already in the hall.");
        }else if (capacity != data.size()){
            data.add(student);
            return String.format("Added student %s %s.",
                    student.getFirstName(), student.getLastName());
        }else {
            return ("The hall is full.");
        }
    }

    public String remove(Student student){
        if (data.remove(student)){
            return String.format("Removed student %s %s.",
            student.getFirstName(), student.getLastName());
        }else {
            return "Student not found.";
        }
    }
    public Student getStudent(String firstName, String lastName){
        return data.stream().filter(d ->
                d.getFirstName().equals(firstName) && d.getLastName().equals(lastName))
                .findFirst().orElse(null);
    }

    public String getStatistics(){
        StringBuilder studentSb = new StringBuilder();
        data.forEach(d -> studentSb.append(d).append("\n"));

        return String.format("Hall size: %d%n%s", data.size(), studentSb);
    }


}
