<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/chatbot.js"></script>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/chatbot.css">
    <link rel="stylesheet" href="css/faq.css">
    <title>FDM Graduate Careers</title>
</head>
<body>
<div id="fdm">
    <div id="bar">
        <img src="media/fdm-logo-anim.gif" width="120" height="60">
        <h1 style="font-size: 30px;padding: 5px">Frequently Asked Questions</h1>
    </div>
    <!- for demo purposes only ->
    <!- shows what the chatbot will look like a page similar to FDM's ->

    <div id="content">
        <div id="table">

            <table>
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><strong>What is an IT or business consultant?</strong></td>
                    <td>A consultant works in partnership with clients on specific projects either as part of an outsourced team or to supplement an existing one. Consultants are relocated to client centres for a contracted amount of time to plan and develop business or technology systems and may also be asked to provide expert advice related to their specialism. Consultancy is a flexible career as projects can range from a few months to years depending on its size. This can lead to opportunities for travel and a variety of challenging and exciting assignments with a range of clients. FDM consultants are employed by FDM to provide professional business and IT consultancy to our clients.

                    </td>

                </tr>
                <tr>
                    <td><strong>What is the FDM Graduate Programme?</strong></td>
                    <td>The FDM Graduate Programme consists of foundation training followed by an individual learning pathway, where trainees will learn the skills required to become an FDM consultant working on-site with our clients. We have training academies across APAC, Europe and North America that provide fast-track skills development to those with a passion for IT and business. After completing your training you will work on placements on our client sites for at least two years.</td>

                </tr>
                <tr>
                    <td><strong>Is it essential for me to have an IT degree?</strong></td>
                    <td>We welcome candidates from a range of academic backgrounds including Science, Technology, Engineering and Mathematics (STEM). We also accept applications from non-STEM graduates who demonstrate a passion for working in the IT industry, particularly for our business pathways.</td>

                </tr>
                <tr>
                    <td><strong>What if I already have IT accreditations or qualifications that FDM offers?</strong></td>
                    <td>This puts you at an advantage, however you would still need to attend the training for that module or sit an exam in order to demonstrate these competencies so that we can confidently recommend you to our clients.</td>

                </tr>
                <tr>
                    <td><strong>Will I have to pay for my training?</strong></td>
                    <td>The training you receive is funded by FDM as long as you commit to work for us for two years.

                    </td>

                </tr>
                <tr>
                    <td><strong>What does an FDM assessment day involve?</strong></td>
                    <td>FDM’s assessment day enables us to assess candidates for a range of skills including: technical, numerical, interpersonal and teamwork. Our assessment centres run on a bi-weekly basis from 9am to 3pm. The schedule of the day involves welcome talks from FDM management followed by a talk from HR to run through any questions you may have regarding our contract and business model. Following this, there will be three tests; mathematics, logical-thinking aptitude and a set theory diagram test. You will also have three separate interviews conducted by FDM managers from various departments within the business; this ensures every candidate is given a fair and equal opportunity. FDM’s assessment is not only a chance for us to assess you, it is also an opportunity for you to ask FDM any questions you may have and find out more about us. FDM will provide lunch and give you the opportunity to talk to current trainees and consultants.</td>

                </tr>
                <tr>
                    <td><strong>What happens after I complete my training?</strong></td>
                    <td>After you successfully complete your training you will be available for client roles. Once selected for placement, you start a two-year employment with FDM as an IT or business consultant. During these two years, you could be placed on one or more of our client sites.</td>

                </tr>
                <tr>
                    <td><strong>What companies will I be working with?</strong></td>
                    <td> You can be placed with any of FDM’s prestigious clients. You may end up working at the same place for the whole two years, or you may be placed on various client sites throughout that time.

                    </td>

                </tr>
                <tr>
                    <td><strong>What happens at the end of the two years?</strong></td>
                    <td>You have a number of options to progress your career further within the IT or business sector. You will still be an FDM employee working for an award-winning company. However, you are no longer contractually bound to remain with the company and can pursue other avenues if you prefer, such as transitioning into permanent employment with a client you have been placed with. FDM continues to provide our Senior Consultants with demanding and fulfilling technical and business placements. They also have the option of pursuing roles internally. No matter how you choose to progress your IT career, you will have two years of excellent commercial experience gained through the FDM Graduate Programme.</td>

                </tr>
                </tbody>
            </table>



        </div>
    </div>
</div>
<!- END ->
<audio id="messageReceived" src="media/message.mp3"></audio>
<div id="main">
    <div id="chatbot">
        <div id="titlebar">
            <div id="green">&#8226;</div>
            Chatbot
            <div class="dialog">
                <a href="#" class="close-X" onclick="minimise()"></a>
            </div>
            <img id="imageSoundOn" src="media/soundOff.png" title="mute" width="20" height="20" onclick="soundChangeOff()">
            <img id="imageSoundOff" src="media/soundOn.png" title="un-mute" width="20" height="20" onclick="soundChangeOn()">
        </div>
        <div id="messages">

        </div>
        <div id="inputBar">
            <img src="media/speech.png" id="speechControl" width="20px" height="20px" onclick="speech()" title="Turn chat bot speech on">
            <input id="input" type="text" placeholder="Type a message and hit enter">
            <img id="saveLog" src="media/email.png" width="20px" height="15px" onclick="save()" title="Email the chat log">
        </div>
    </div>
    <div id="collapse">
        <div id="greenA">&#8226;</div>
        Chat With Us
        <button onclick="reopen()" style='color: white; background-color: transparent;float: right;border:none;font-size: 20px'><b>-</b></button>
    </div>
</div>
<div id="emailPopUp">
    <div id="boxed">
        <button id="close" onclick="closeEmail()">X</button>
        <h1 style="font-size: 40px;">Email Your Chat Log</h1>

        <label for="email">Enter Your Email:</label>
        <br>
        <input type="text" id="email">
        <button id="submitEmail" onclick="sendEmail()">Send</button>

    </div>
</div>
</body>
<script src='//vws.responsivevoice.com/v/e?key=7muhKJWW'></script>
</html>