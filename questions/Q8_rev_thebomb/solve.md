## Actual C code

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void decrypt(unsigned char *input_bytes, size_t len, unsigned char *decrypted) {
    for (size_t i = 0; i < len; i++) {
        unsigned char byte = input_bytes[i];
        byte ^= 0xAA;
        byte = ~byte & 0xFF;
        if (byte % 2 == 0) byte ^= 0x5A;
        
        decrypted[i] = byte;
    }
}


void print_bytes_as_string(unsigned char *byte_array, size_t len) {
    for (size_t i = 0; i < len; i++) {
        if (byte_array[i] >= 32 && byte_array[i] <= 126) {
            printf("%c", byte_array[i]);
        } else {
            printf("\\x%02X", byte_array[i]);
        }
    }
    printf("\n");
}

int main() {
    unsigned char enc_pass[] = {0x26, 0x36, 0x67, 0x3a, 0x3a, 0x63, 0x4d, 0x14, 0x4b};
    unsigned char enc_flag[] = {0x69, 0x63, 0x34, 0x32, 0x2E, 0x41, 0x3F, 0x0A, 0x22, 0x4F, 0x2C, 0x0A, 0x20, 0x0A, 0x7D, 0x66, 0x79, 0x66, 0x7D, 0x26, 0x66, 0x6B, 0x0A, 0x64, 0x7B, 0x28};
    int len = sizeof(enc_pass) / sizeof(enc_pass[0]);
    char input[50];
    int wire_choice;

    printf("\n");
    printf("There are 50 wires:-\n");
    printf("1: Red Wire 1\n2: Yellow Wire 1\n3: Blue Wire 1\n...\n49: Violet Wire 6\n50: Orange Wire 4\n");
    printf("Enter a number to cut that wire: ");
    scanf("%d", &wire_choice);
    printf("\n");

    char c;
    while ((c = getchar()) != '\n' && c != EOF);

    if (wire_choice != 42) {
        printf("\nWrong wire... Allahu Akbar\n\n");
        exit(0);
    } else printf("\nBomb seems stable...\n\n");


    printf("\nEnter the password to defuse the bomb: ");
    fgets(input, sizeof(input), stdin);

    unsigned char decrypted_pass[len];
    decrypt(enc_pass, len, decrypted_pass);

    if (strncmp(input, decrypted_pass, 9) == 0) {
        unsigned char decrypted_flag[sizeof(enc_flag)];
        decrypt(enc_flag, sizeof(enc_flag), decrypted_flag);
        printf("\nBomb defused! Flag: \n");
        print_bytes_as_string(decrypted_flag, sizeof(enc_flag));
    } else {
        printf("\nWrong password! BOOM!\n");
    }

    return 0;
}
```

## Solve
The wire to be cut is 42
You can then use ghidra or IDA to observe decrypt() function and then reverse engineer it to get the password

This question can be cheesed using gdb

1) gdb ./bomb

2) break 57

3) p decrypted_pass

> output: schoolBAD

Run it again and enter the password as schoolBAD

> flag: **flag{N0_w@y_u_r3v3rs3d_1t}**
