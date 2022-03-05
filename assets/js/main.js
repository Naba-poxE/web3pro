Moralis.initialize("ik5NKf20WeXOcFbhSmvdcyFGCsY2euxbW5XOEdJU"); // Application id from moralis.io
Moralis.serverURL = "https://490mnyizshzi.usemoralis.com:2053/server"; //Server url from moralis.io

async function login(){
    try {
        user = await Moralis.User.current();
        if(!user){
            user = await Moralis.Web3.authenticate();					
        }
        
        var userid_name = user.id;
        var email = user.attributes.email_id;
        var eth = user.attributes.ethAddress;
        var name = user.attributes.nickname;
        var earn = user.attributes.coin;
        //console.log(user.attributes)
        alert_user_lo(userid_name, email, eth, name, earn)
        setCookie("user_id",userid_name,1); 
        document.getElementById('login_bth_naba').innerHTML='Connected,' + userid_name;

    } catch(error) {
        console.log(error);
    }
    
}
function alert_user_lo(a, b,c,d,e){
    var user_id = a;
    var user_name = d;
    var user_email = b;
    var user_eth = c;
    var user_eat = e;

    Swal.fire({
        showConfirmButton:false,
        html:
            '<img src="https://ouch-cdn2.icons8.com/v4Dd7ZVeGJ5E1OAIwKqxWgWaXJd9byqBDQaV8EKTvRY/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTMy/Lzc3ZDY3NmU2LWVj/ODQtNDU4NS1hZjUx/LTU0ZGFmOTMyMzNk/Yi5wbmc.png" style="width:200px; height:200px;"/>'+
            '<div style="text-align:left;"><h3>Hello,'+ user_name + '</h3>' +
            'ID:' + user_id + '<br>' +
            'Name: ' + user_name + '<br>' +
            'Email: ' + user_email + '<br>' +
            'Earning: ' + user_eat + '<br>' +
            'Eth Adress: ' + user_eth + '<br></div>' +


            '<button onclick="updateUserdata()" class="button-1">Update</button>'+
            '<button onclick="logout()" class="button-1">Logout</button>',
        })
}
function alert_user_li(){
    Swal.fire({
        showConfirmButton:false,
        html:
            '<img src="https://ouch-cdn2.icons8.com/v4Dd7ZVeGJ5E1OAIwKqxWgWaXJd9byqBDQaV8EKTvRY/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTMy/Lzc3ZDY3NmU2LWVj/ODQtNDU4NS1hZjUx/LTU0ZGFmOTMyMzNk/Yi5wbmc.png" style="width:200px; height:200px;"/>'+
            '<h3>Hello, User</h3>'+
            '<p>You are not logind to the system</p>'+

            '<button onclick="login()" class="button-1">Login</button>',
        })
}
async function logout(){
    try {
        await Moralis.User.logOut();
        document.getElementById('login_bth_naba').innerHTML="Connect";
        delCookie()
        location.reload();
        alert_user_li()
    } catch(error) {
        console.log(error);
    }
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function delCookie() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
async function updateUserdata(){
    try {
        user = await Moralis.User.current();
        if(!user){
            user = await Moralis.Web3.authenticate();					
        }

        
        const { value: person } = await Swal.fire({
            title: 'Input Your Name',
            input: 'text',
            inputPlaceholder: 'Full Name'
        
        })
        
        const { value: person_email } = await Swal.fire({
            title: 'Input email address',
            input: 'email',
            inputLabel: 'Your email address',
            inputPlaceholder: 'Enter your email address'
        })

        user.set("nickname", person);
        user.set("email_id", person_email);
        user.save();

        var userid_name = user.id;
        var email = user.attributes.email_id;
        var eth = user.attributes.ethAddress;
        var name = user.attributes.nickname;
        var earn = user.attributes.coin;
        alert_user_lo(userid_name, email, eth, name, earn)
        
        

    } catch(error) {
        console.log(error);
    }
    
}
async function update_earnings(){
    try {
        user = await Moralis.User.current();
        if(!user){
            user = await Moralis.Web3.authenticate();					
        }
        let plue_audio = 10
        var earn = user.attributes.coin;
        var total = +earn + +plue_audio
        //console.log(total);
        user.set("coin", total ); 
        user.save();
        Swal.fire({
            icon: 'success',
            title: 'Your earning has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        

    } catch(error) {
        console.log(error);
    }
    
}