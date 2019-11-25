import { findOneMail, findByPassword, create,admin} from '../model/userModel';
import { hashPassword, comparePasswords, authenticateUser } from '../help/help';

const Auth = {
  create(req, res) {
    
    const { email } = req.body;
    let verifyEmail = findOneMail(email);
    
    if (verifyEmail) {
       return res.status(409).redirect('sign-up');
      //   status: 409,
      //   error: 'email already taken',
      // });
    }
    let creates = create(req.body);
    console.log(creates);
    let passwords = hashPassword(creates.password);
    // const email = (creates.email);
    //const token = authenticateUser(email, creates.id);
     req.session.email = creates.email
     if(creates.email==='mubikayipatrick2@gmail.com'){
     return res.redirect('admin-dashboard')
  }
    //return res.header('auth-token', token).status(201).redirect('dashboard')
    return res.status(201).redirect('dashboard')
    //send({
    //   status: 201,
    //   message: 'User created successfully',
    //   data: ({ creates,token }),
    // });
  },
  connect(req, res) {
    let { email, password } = req.body;
    let verifyEmail = findOneMail(email);
    if (!verifyEmail) {
     // return res.header('auth-token', token).status(201).redirect('sign-in')
     return res.status(201).redirect('sign-in')
      //   status: 401,
      //   error: 'wrong Email',
      // });
    }
   
    let compare = comparePasswords(req.body.password, verifyEmail.password);

    if (!compare) {
      return res.status(201).redirect('sign-in')
    }
    //   return res.status(401).send({
    //     status: 401,
    //     error: ' Wrong Password ):',
    //   });
    // }
  let creates = create(req.body);
  // console.log(creates);
 if(creates.email==='mubikayipatrick2@gmail.com'){
   return res.redirect('admin-dashboard')
 }
  //  console.log(admin);
    //return res.header('auth-token', token).status(201).redirect('dashboard')
    return res.status(201).redirect('dashboard')
 
},
}

export default Auth;
