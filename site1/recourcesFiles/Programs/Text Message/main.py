import smtplib
import info



phone_number = input("What is the phone number of the recipient:\n")
carrier = input("What is the carrier of the recipient (AT&T, t-mobile, verizon, sprint):\n").lower()
textInp = input("What is the body of the text:\n")

carriers = {
    'at&t':'@mms.att.net',
    't-mobile': '@tmomail.net',
    'verizon': '@vtext.com',
    'sprint': '@messaging.sprintpcs.com5'
}



def send(text):
    emailAndNumber = phone_number + carriers[carrier]
    # Establish a secure session with gmail's outgoing SMTP server using your gmail account
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(info.email, info.password)

    # Send text message through SMS gateway of destination number
    server.sendmail(info.email, emailAndNumber, text)
    print("Sent successfully to email address: ", emailAndNumber, "\n")


if carrier in carriers:
    try:
        send(textInp)
    except smtplib.SMTPAuthenticationError: 
        print("Could not send message. This can be caused because of bad credentials or the account has Third-Party access disabled.")

else:
    print(carrier + " is not a valid carrier.\n")