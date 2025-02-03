Moderation will be done by a "government" website, resembling a THM room. The sanity check will be given in the entry point website. Each question solved will reveal the next question.

1. Sanity check
2. Decode ciphertext and find social media handle (OSINT)
3. LLM Hacking
4. (Some connecting chall here)
5. Mono-substitution cipher decrypting (gotta make it obvious)
6. SQL injection
7. Just look at metadata and find coordinates and find the place hYae goes to (_forensics_ + osint)
8. Moderately hard Reversing chall

Entry point: QR code in the missing person's poster leads to the missing persons' info website made by the police. Website contains random info about the victim. Below that, it should contain the sanity check, with a caption like "enter this text to get started with tracking your investigation.", making it like you are helping the government solve this case. The first puzzle will be below this section, which is ciphertext left by the killer at the murder scene.

Kind of a retcon, but we can have an "Update" section in the missing persons' info website, telling the victim was murdered, and this was the text left behind by the killer.

The ciphertext will be some long sentence having the next victim's name, leading to the OSINT challenge

1st : Sanity Check

2nd challenge: The decoded ciphertext contains the name of the next victim. The detective searches for info about them in various social media, and finds the personal account of them. The last post made in that account is about a blind date with some person.

social media handle. The last post in that account was meeting this particular person, for some reason(a blind date or some stupid shit). This person will be an LLM, and the name of the person (LLM) is the flag for the 1st challenge.

3rd challenge: The LLM is the friend of the killer and holds some secret information. Ofcourse as a friend it refuses to tell you anything. So we need to make it spill out some "secret". 

4th challenge: Something using this "secret"

5th challenge: You get the link to the blog of the suspect. While seemingly ordinary, there is one blog post with some ciphertext. The ciphertext seems to be a substitution cipher, made obvious by the title of the blog. The answer to the puzzle is the last sentence of the decoded ciphertext

challenge 6: You find out that there is a login page and you also find out that the author has some archived posts accessible only by him. Break into his account and retrieve the name of the institution he studies in/goes to.

challenge 7: You break into the personal account of the killer, and find his archived post. The archived post has the image of his most recent killing, which seemed to have happened at a very unlikely place. Find where the image was taken, maybe you can really catch him this time.

challenge 8: The agency finds out the real identity of the killer from the information you provided. Good Job!. Now, the killer has sent a very ominous message to you about bombs blowing. 
Last: The killer has caught on to you. Maddened, he has decided to bomb the very place he is studying in, using a Trojan which is a ticking time bomb, which will detonate the explosive from afar if certain conditions are met. The killer sends the trojan to you as a challenge, a taunt. You analyze the trojan and realize there is a disarm feature for whatever reason. Find the string that will make the disarm function work

The agency will somehow connect to the trojan and disarm it idk You win!!!!

Notes: Victor is a fake identity, his real name is [salam yusuf or idk insert some random muslim name for funs]
