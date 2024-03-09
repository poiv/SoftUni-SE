function students(input) {

    function printCourses(courses){
        courses.sort((a, b) => b.students.length - a.students.length);
        for (const course of courses) {
            console.log(`${course.name}: ${course.capacity} places left`);

            course.sortStudents();
            for (const student of course.students) {
                console.log(`--- ${student.credits}: ${student.username}, ${student.email}`);
            }
        }
    }
    class Course {
        constructor(name, capacity) {
            this.name = name;
            this.capacity = capacity;
            this.students = [];
        }

        name;
        capacity;
        students;

        sortStudents() {
            this.students.sort((a, b) => b.credits - a.credits);
        }

        addMoreCapacity(capacity) {
            this.capacity += capacity;
        }

        hasCapacity() {
            return this.capacity > 0;
        }

        addStudent(student) {
            this.students.push(student);
            this.capacity -= 1;
        }
    }

    let courses = [];
    for (const string of input) {
        if (string.includes(': ')) {
            let [name, capacity] = string.split(': ');
            let course = new Course(name, Number(capacity));

            let existingCourse = courses.find((c) => c.name === name);
            if (existingCourse) {
                existingCourse.addMoreCapacity(Number(capacity));
                continue;
            }
            courses.push(course);
        }
        else if (string.includes(' with email ')) {
            let [nameCredits, email, courseName] = string.split(' ').filter((s) => s !== 'with' && s !== 'email' && s !== 'joins');
            let username = nameCredits.split('[')[0];
            let credits = Number(nameCredits.split('[')[1].replace(']', ''));
            let existingCourse = courses.find((c) => c.name === courseName);

            if (existingCourse && existingCourse.hasCapacity()) {
                existingCourse.addStudent({username, email, credits});
            }
        }
    }

    printCourses(courses);

}