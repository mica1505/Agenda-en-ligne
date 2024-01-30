var currentdate = new Date();
    date = new Date;
    annee = date.getFullYear();
    moi = date.getMonth();
    mois = new Array('Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre');
    j = date.getDate();
    jour = date.getDay();
    jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
    date = jours[jour]+' '+j+' '+mois[moi]+' '+annee+'';
    var time = currentdate.getHours()+" h "+currentdate.getMinutes()+" min "+currentdate.getSeconds()+" sec";
    document.getElementById('date').innerHTML = date;
    document.getElementById('heure').innerHTML = time;
    function ActualiseHeure()
    {
       var time = currentdate.getHours()+" h "+currentdate.getMinutes()+" min "+currentdate.getSeconds()+" sec";
       document.getElementById('heure').innerHTML = time;
    }
    setInterval(function(){
       var currentdate = new Date();
       document.getElementById('heure').innerHTML = (currentdate.getHours()+" h "+currentdate.getMinutes()+" min "+currentdate.getSeconds()+" sec"); }, 1000);
function cancel(){
   alert("Vous avez annuler les modifications");
}