import './header.css';

export function Header(props){
    return(
       <header>
           {props.children}
       </header> 
    );
}