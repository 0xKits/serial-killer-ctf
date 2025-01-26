# Question ideas

### Crypto
(Personally I believe using basic ahh ciphers would be boring. We should try for something more fun.)
And since we might be going for a proper killer chase it'll be more of like: us starting with little information and then gaining more intel and making more connections.
Possible questions-
- Shashi is the friend and last witness of the serial killer. So basic LLM hacking to get the truth (flag) about the serial killer. (The flag could be a key of AES (or the private key if we wanna do RSA cryptosystem), which could be used to decrypt an encrypted message later in the chall or something given earlier.)
- We give them a big text document (could include either the plans of the killer or anything else) with something like a mono-alphabetic substitution, possibly there are a few ways to solve it:
	- Bruteforce: try out all the possible combinations
	- Letter Frequency: Since we are providing a large document, we can map the most frequently occurring letters in the given document, with the frequency they appear in english language.
	As even bruteforcing it is pretty feasible, we can either keep it as one of the beginning challs or add more parts to it to make it a harder challenge and stop bruteforce [Refer to Exercise 2 page 4](https://download.e-bookshelf.de/download/0000/0008/88/L-G-0000000888-0002340122.pdf) 
- 

### Forensics
A few type of things we can do.
- The murderer takes the pics of the dead bodies and uploads them somewhere. 
	- Location of the dead boy (Geoloc based Osint) 
	- Date/Time of the murder can be confirmed (Another setup for future challs)
	- Hidden Message(or image) inside the image using XOR or LSB hiding or hiding it in some particular RGB layer. (Seems like a good idea to me) ([Inspiration chall](https://cryptohack.org/challenges/general/) Check out the Lemur XOR challenge for a simple example)
- The serial killer connected to public wifi:-
	- The serial killer's texts being sent and received (There are a few possibilities of questions here)
	- The sites that they are visiting (possibly the killer stalking their next target, or if the killer is booking their tickets to flee from the town or so many more things)
	- Some particular data that the serial killer downloaded, and then that data could technically be an ELF (executable file) which could lead to a reversing chall ([inspiration chall](https://medium.com/@nathanielpascuarijndorp/uoftctf-2025-poof-8c4146bfdc65) We can make it a little more straightforward though)
