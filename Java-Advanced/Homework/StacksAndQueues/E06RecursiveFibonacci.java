import java.util.Scanner;

public class E06RecursiveFibonacci {
    public static long[] arr = new long[50];

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();

        arr[0] = 1;
        arr[1] = 1;

        System.out.println(fibonacci(n));
    }

    public static long fibonacci(int n){
        if (arr[n] != 0) {
            return arr[n];
        }
        long result = fibonacci(n - 1) + fibonacci(n - 2);
        arr[n] = result;
        return result;
    }
}
