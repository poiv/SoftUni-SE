function schoolRegister(array) {
    class Grade {
        constructor(grade) {
            this.grade = grade;
            this.students = [];
        }

        addStudent(student) {
            this.students.push(student);
        }

        get avgScore() {
            return this.students.reduce(((a, c) => a + c.score), 0) / this.students.length;
        };

        print() {
            let studentNames = this.students.map((s) => s.name).join(', ');
            console.log(`${this.grade} Grade`);
            console.log(`List of students: ${studentNames}`);
            console.log(`Average annual score from last year: ${this.avgScore.toFixed(2)}`);
            console.log();
        }
    }

    function infoArrayToClass(infoArray) {
        let pvPairs = infoArray.split(', ');
        let [pvName, pvGrade, pvScore] = pvPairs.map((p) => p.split(': ')[1]);

        return {name: pvName, grade: Number(pvGrade) + 1, score: Number(pvScore)};
    }

    let students = array.map((e) => infoArrayToClass(e))
        .filter((s) => s.score >= 3)
        .sort((a, b) => a.grade - b.grade);

    let grades = [];

    let lastGrade;
    for (const student of students) {
        if (!lastGrade || lastGrade.grade !== student.grade) {
            lastGrade = new Grade(student.grade);
            grades.push(lastGrade);
        }
        lastGrade.addStudent(student);
    }

    grades.forEach((g) => g.print());
}