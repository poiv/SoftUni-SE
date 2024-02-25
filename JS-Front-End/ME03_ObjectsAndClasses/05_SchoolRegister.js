function schoolRegister(array) {
    class Grade {
        constructor(grade, students) {
            this.grade = grade;
            this.students = students;
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
        let pvName = pvPairs[0].split(': ')[1];
        let pvGrade = Number(pvPairs[1].split(': ')[1]) + 1;
        let pvScore = Number(pvPairs[2].split(': ')[1]);
        return {name: pvName, grade: pvGrade, score: pvScore};
    }

    let students = array.map((e) => infoArrayToClass(e))
        .filter((s) => s.score >= 3)
        .sort((a, b) => a.grade - b.grade);

    let grades = [];

    let lastGrade = null;
    for (const student of students) {
        if (!lastGrade || lastGrade.grade !== student.grade) {
            lastGrade = new Grade(student.grade, [student]);
            grades.push(lastGrade);
            continue;
        }
        lastGrade.students.push(student);
    }

    grades.forEach((g) => g.print());
}