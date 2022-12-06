var formStartTime;

function startTimer() {
    formStartTime = new Date();
    formStartTime = formStartTime.getTime();
}

function showFrameVis() {
    let cookie = document.cookie.split(';');
    let cookieObj = JSON.parse(cookie);
    if (cookieObj.username === 'riya@proj.ca') {
        reload();
    }
}

function logOut() {
    let cookie = document.cookie.split(';');
    let cookieObj = JSON.parse(cookie);
    cookieObj.username = '';
    let cookieString = JSON.stringify(cookieObj);
    document.cookie = cookieString;
    parent.location.href = 'index.htm';
}

function login() {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1000 * 36000;
    now.setTime(expireTime);

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username === 'riya@proj.ca' && password === '123') {
        let cookie = {
            username: username,
        };
        let cookieString = JSON.stringify(cookie);
        document.cookie = cookieString;
        reload();
    } else {
        alert('username: riya@proj.ca & password: 123');
    }
}

function reload() {
    parent.location.href = 'indexMenu.htm';
}

function storeCookie(
    fname,
    lname,
    email,
    phone,
    contactBack,
    message,
    endTime
) {
    let cookie = {
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        contactBack: contactBack,
        message: message,
        startTime: formStartTime,
        endTime: endTime,
    };
    let cookieString = JSON.stringify(cookie);
    document.cookie = cookieString;
}

function getCookie() {
    let cookie = document.cookie.split(';');
    let cookieObj = JSON.parse(cookie[0]);
    let fname = (cookieObj.fname = cookieObj.fname.toUpperCase());
    let lname = (cookieObj.lname = cookieObj.lname.toUpperCase());
    let email = cookieObj.email;
    let phone = cookieObj.phone;
    let contactBack = cookieObj.contactBack;
    let message = cookieObj.message;
    let formTime = cookieObj.endTime - cookieObj.startTime;
    document.getElementById('fname').innerHTML = fname;
    document.getElementById('lname').innerHTML = lname;
    document.getElementById('email').innerHTML = email;
    document.getElementById('phone').innerHTML = phone;
    document.getElementById('contactBack').innerHTML = contactBack;
    document.getElementById('message').innerHTML = message;
    document.getElementById('formTime').innerHTML =
        Math.round(formTime / 600) / 100 + ' seconds';
}

function validateForm() {
    let fname = document.forms['myForm']['fname'].value;
    let lname = document.forms['myForm']['lname'].value;
    let email = document.forms['myForm']['email'].value;
    let phone = document.forms['myForm']['phone'].value;
    let contactBack = document.forms['myForm']['contactBack'].value;
    let message = document.forms['myForm']['message'].value;

    if (fname == '') {
        alert(' First Name must be filled out');
        return false;
    } else if (!/^[a-zA-Z]+$/.test(fname)) {
        alert('Please only enter alpha characters');
        return false;
    }
    if (lname == '') {
        alert('Last Name must be filled out');
        return false;
    } else if (!/^[a-zA-Z]+$/.test(lname)) {
        alert('Please only enter alpha characters');
        return false;
    }
    if (email == '') {
        alert('Email must be filled out');
        return false;
    } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            email
        )
    ) {
        //eslint-disable-line
        alert('Please enter a valid email address');
        return false;
    }
    if (phone == '') {
        alert('Phone must be filled out');
        return false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
        alert('Please enter a valid phone number');
        return false;
    }
    if (contactBack == '') {
        alert('Please select a contact method');
        return false;
    }
    if (message == '') {
        alert('Message must be filled out');
        return false;
    }

    var now = new Date();
    storeCookie(
        fname,
        lname,
        email,
        phone,
        contactBack,
        message,
        now.getTime()
    );

    return true;
}
