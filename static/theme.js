function addDarkmodeWidget() {
    new Darkmode(options).showWidget();
  }
  window.addEventListener('load', addDarkmodeWidget);
  const options = {
    bottom: '32px', 
    right: '32px', 
    left: 'unset', 
    time: '0.5s',
    mixColor: '#fff', 
    backgroundColor: '#fff',  
    buttonColorDark: '#000',  
    buttonColorLight: '#fff', 
    saveInCookies: true, 
    label: '', 
    autoMatchOsTheme: true 
  }