text = open('encrypted_text.txt', encoding='utf-16').read()

shift = len(text)

def get_primes(n):
    primes = []
    num = 2
    while len(primes) < n:
        for p in primes:
            if num % p == 0:
                break
        else:
            primes.append(num)
        num += 1
    return primes

primes = get_primes(shift)
rotprimes = primes[shift:] + primes[:shift]

decrypted = [chr((ord(c) ^ rotprimes[i])>>2) for i, c in enumerate(text)]

print("".join(decrypted))

# OUTPUT:-

# Date: 05/07/24  

# Today was the worst day of my life. Everything I worked for, everything I sacrificed, gone in an instant. They took it all—my savings, my future, my trust. It wasn’t just a game. It was a system designed to break people like me, to strip us down to desperation, then leave us to rot.  

# They knew. They always knew. The odds were never in my favor, yet they made me believe. False hope. Manipulated chances. They turned my own mind into a weapon against me. And when I finally saw the truth, it was too late.  

# flag{shattered_illusions_and_broken_promises}  

# I will not be the only one to suffer. I will make them understand the pain of betrayal, the emptiness of realizing you were never meant to win. Everyone who profits from this machine, everyone who stands by and watches as lives crumble—they will feel what I feel. No one is innocent.  

# This is not just revenge. This is justice.  

# (I should put this into the secret archive that only I can access on the blog. If I ever forget why I started, this will remind me. No amount of obscuring the truth will change what happened.)
