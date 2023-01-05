import java.util.Scanner;

public class NavyBattle {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = Integer.parseInt(scanner.nextLine());
        char[][] battlefield = new char[n][n];
        int[] submarinePos = new int[2];

        for (int i = 0; i < n; i++) {
            String input = scanner.nextLine();
            for (int j = 0; j < n; j++) {
                char ch = input.charAt(j);
                battlefield[i][j] = ch;
                if (ch == 'S') {
                    submarinePos = new int[]{i, j};
                }
            }
        }

        int hits = 0;
        int battleCruiserCount = 0;

        String direction = scanner.nextLine();
        while (hits < 3 && battleCruiserCount < 3){
            int currRow = submarinePos[0];
            int currCol = submarinePos[1];

            int[] nextDirections = newDirections(submarinePos, direction);
            int nextRow = nextDirections[0];
            int nextCol = nextDirections[1];
            char nextCh = battlefield[nextRow][nextCol];

            if (nextCh == '*'){
                hits++;
            }else if (nextCh == 'C'){
                battleCruiserCount++;
            }

            submarinePos[0] = nextRow;
            submarinePos[1] = nextCol;
            battlefield[currRow][currCol] = '-';
            battlefield[nextRow][nextCol] = 'S';

            if (Math.max(hits, battleCruiserCount) > 2) continue;
            direction = scanner.nextLine();
        }

        if (hits > 2){
            System.out.println("Mission failed, U-9 disappeared!" +
                    " Last known coordinates [" + submarinePos[0] + ", " + submarinePos[1] + "]!");
        }else {
            System.out.println("Mission accomplished, U-9 has destroyed all battle cruisers of the enemy!");
        }

        for (char[] chars : battlefield) {
            for (char aChar : chars) {
                System.out.print(aChar);
            }
            System.out.println();
        }
    }

    public static int[] newDirections(int[] oldDirections, String direction){
        int newRow = oldDirections[0];
        int newCol = oldDirections[1];
        switch (direction){
            case "left":
                newCol--;
                break;
            case "right":
                newCol++;
                break;
            case "up":
                newRow--;
                break;
            case "down":
                newRow++;
                break;
        }
        return new int[]{newRow, newCol};
    }
}
