import { RegisterUser,GetImage,AddImage } from "../services/UserService";
import React,{useState,useRef} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";



export default function Register(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [password2,setPassword2]=useState('');
    const [Name,setName]=useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [address,setAddress]=useState('');
    const [dateOfBirth,setDateOfBirth]=useState('');
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);
    const [imageUrl,setImageUrl]=useState("");
    const [file,setFile]=useState(null);
    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };



    const handleInputChanges = e=>{
        const{name,value}=e.target
        if(name=="username"){
            setUsername(value);
        }
        if(name=="password"){
            setPassword(value);
        }
        if(name=="password2"){
            setPassword2(value);
        }
        if(name=="name"){
            setName(value);
        }
        if(name=="lastname"){
            setLastname(value);
        }
        if(name=="email"){
            setEmail(value);
        }
        
        if(name=="address"){
            setAddress(value);
        }
        if(name=="uloga"){
            setAddress(value);
        }
    }
    const uloga=useRef();
    const dateInputRef = useRef(null);
    const register=async e=>{
        
        e.preventDefault();
        if(validate()){
           const values={Username:username,Password:password,NameLastname:Name+"/"+lastname,Email:email,Address:address,TypeOfUser:uloga.current.value,DateOfBirth:dateInputRef.current.value};

            const resp= await RegisterUser(values);
            console.log(resp);
            if(resp.data!=''){
                if(uloga.current.value=="PRODAVAC"){
                    setData("Vaš zahtev za registraciju je uspešno poslat!")
                    openDialogBox();
                }
                else{
                    setData("Čestitamo, uspešno ste registrovani!")
                    openDialogBox();
                }
            }
            else{
                setData("Osoba sa tim korisničkim imenom ili mejlom već postoji!")
                openDialogBox();
            }
            if(file!=null){
                const response=AddImage(file,resp.data.id);
                console.log(response);
            }
        }
    }

        let usernameError = "";
        let passwordError = "";
        let nameError="";
        let lastnameError="";
        let addressError="";
        let birtdayError="";
        let emailError="";
        let imageError="";
        let dateError="";

        const validate=()=>{
            if (!username) {
                usernameError = "Korisničko ime je obavezno!";
                setData(usernameError);
                openDialogBox();
            }
            
            else if (!password) {
                passwordError = "Lozinka je obavezna!";
                setData(passwordError);
                openDialogBox();
            }

            else if(!password2){
                passwordError = "Molimo Vas, ponovite Vašu lozinku još jednom!";
                setData(passwordError);
                openDialogBox();
            }

            else if(password!=password2){
                passwordError = "Niste dobro ponovili lozinku!";
                setData(passwordError);
                openDialogBox();
            }

            else if (!Name) {
                nameError = "Molimo Vas unesite Vaše ime!";
                setData(nameError);
                openDialogBox();
            }

            else if (!lastname) {
                lastnameError = "Molimo Vas unesite Vaše prezime!";
                setData(lastnameError);
                openDialogBox();
            }

            else if (!email) {
                emailError = "Mejl adresu je obavezno uneti!";
                setData(emailError);
                openDialogBox();
            }

            else if (!address) {
                addressError = "Polje za adresu je obavezno!";
                setData(addressError);
                openDialogBox();
            }

            else if(!imageUrl){
                imageError = "Slika korisnika je obavezna!";
                setData(imageError);
                openDialogBox();
            }

            var today = new Date();
            var unos=dateInputRef.current.value;
            if(!unos){
                dateError="Potrebno je uneti datum rođenja!"
                setData(dateError);
                openDialogBox();
            }
            const date1 = new Date(today.getFullYear(), today.getMonth(),today.getDate()); 
            const date2 = new Date(unos.split('-')[0], unos.split('-')[1], unos.split('-')[2]);

            if(date1<=date2){
                setData("Datum rođenja je u budućnosti, molimo Vas promenite!");
                openDialogBox();
                return false;
            }


            if (nameError || passwordError || usernameError || lastnameError || birtdayError || emailError || addressError || imageError || dateError) {
                return false;
            }
            return true;
        }
        function handleFileSelect(event) {
            const file = event.target.files[0];
            console.log(file);
            setImageUrl(file);
            const formData = new FormData();
            formData.append("image", file);
            setFile(formData);
            setImageUrl(file)
          }

    return(
        <div class="jumbotron text-center">
            <h3 class="bg-info">Forma za registraciju</h3><br/><br/>
        <form onSubmit={register}> 
            Korisničko ime : <input type={"text"} name='username' value={username} onChange={handleInputChanges}  ></input><br/><br/>
            
            Lozinka: <input type={"password"} name='password' value={password} onChange={handleInputChanges}></input><br/><br/>
            
            Lozinka (ponovite): <input type={"password"} name='password2' value={password2} onChange={handleInputChanges}></input><br/><br/>

            Ime : <input type={"text"} name='name' value={Name} onChange={handleInputChanges}  ></input><br/><br/>

            Prezime : <input type={"text"} name='lastname' value={lastname} onChange={handleInputChanges}  ></input><br/><br/>

            Mejl adresa : <input type="email" name='email' value={email} onChange={handleInputChanges}  ></input><br/><br/>

            Datum rođenja : <input type={"date"} name="date" ref={dateInputRef}></input><br/><br/>

            Adresa : <input type={"text"} name="address" value={address} onChange={handleInputChanges} ></input><br/><br/>

            Uloga : <select ref={uloga} >
                <option value={'KUPAC'}>KUPAC</option>
                <option value={'PRODAVAC'}>PRODAVAC</option>
            </select><br/><br/>

            Slika : <input type="file" onChange={handleFileSelect} />
            {imageUrl && <img src={URL.createObjectURL(imageUrl)} height={300} width={300} />}<br/><br/>
            <input type={"submit"} name='registruj' value={"Registruj se"} onChange={handleInputChanges} class="btn btn-primary"></input><br/>
        </form>
        <br/>


        <Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Registracija </DialogTitle>
            <div class="p-5 text-center bg-image rounded-3" style={{ backgroundColor: "tomato"}}>
            <div class="mask">
                <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-black">
                    <h4 class="mb-3">{data}</h4>
                </div>
                </div>
            </div>
            </div>
         </Dialog>
        </div>
    )
       
}