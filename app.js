const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 8080;

// user model
const Packet = require('./models/Packet');
require('./libs/db-connection');
// view engine
app.set('view engine', 'ejs');


// routes

// attempts

    

    Packet.find({}, function(err, data)
            {
                    if(err){
                            console.log(err, data, data.length);
                    }else{
                            console.log(data);
                    }

                    var Time = [];
                    var Protocol = [];
                    var Grafico = [];


                    for (index in data){

                    var doc = data[index];
                    var objectId = new ObjectID(doc['_id'])
                    var time = objectId.getTimestamp();
                    console.log(doc['PROTOCOL']);
                    var protocol = doc['PROTOCOL'];

                    Protocol.push({"value" : protocol});
                    Time.push({"value" : time});

                    }
    }).sort('-date').limit(100);

app.get("/packet", function(req, res){
        res.render('grafico.ejs',{val: Protocol},{message: req.flash('loginMessage') });
});


//////////////





app.get('/cc', (req, res) => {
        

        const ti =  Packet.find({}, {
                TIME: 1000
              });
              console.log(ti);

        const prot =  Packet.find({}, {
                PROTOCOL: 1000
                });
                console.log(prot);

        const coun =  Packet.find({}, {
                TIME: 1000,
                PROTOCOL: 1000
                });
                console.log(coun);


                res.render('plot', {pktti: ti.prot,  cn: coun.length 
                });
        
      });




//////////////


app.get('/ccc', (req, res) => {
        let  pkttcp, pktudp;
        Packet.find({})
          .then(packets => {
            
      
            
            pkttcp = packets.filter(packet => packet.TIME > 0 && packet.PROTOCOL == 17);
            pktudp = packets.filter(packet => packet.TIME > 0 && packet.PROTOCOL == 6);
            
            
      
            
            res.render('plot', {tcpc: pkttcp.length, udpc: pktudp.length
            
            
            });
          })
          .catch(err => console.error(err));
      });





//////////////



app.get('/', (req, res) => {
  let Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen;
  Packet.find({})
    .then(packets => {
      
      Eight = packets.filter(packet => packet.TIME > 8.00 && packet.TIME < 9.00);
      Nine = packets.filter(packet => packet.TIME > 9.00  && packet.TIME < 10.00); 
      Ten = packets.filter(packet => packet.TIME > 10.00 && packet.TIME < 11.00); 
      Eleven = packets.filter(packet => packet.TIME > 11.00 && packet.TIME < 12.00);
      Twelve = packets.filter(packet => packet.TIME > 12.00 && packet.TIME < 13.00);
      Thirteen = packets.filter(packet => packet.TIME > 13.00 && packet.TIME < 14.00);
      Fourteen = packets.filter(packet => packet.TIME > 14.00 && packet.TIME < 15.00 );
      Fifteen = packets.filter(packet => packet.TIME > 15.00 && packet.TIME < 16.00);
      

      
      res.render('index', {ei: Eight.length, ni: Nine.length, te: Ten.length, el: Eleven.length , tw: Twelve.length , thr: Thirteen.length , fr: Fourteen.length , ff:Fifteen.length});
    })
    .catch(err => console.error(err));
});


app.get('/Github', (req, res) => {
  let Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen;
  Packet.find({})
    .then(packets => {
      
      Eight = packets.filter(packet => packet.TIME > 8.00 && packet.TIME < 9.00 && packet.IP_SRC == '140.82.114.26');
      Nine = packets.filter(packet => packet.TIME > 9.00  && packet.TIME < 10.00 && packet.IP_SRC == '140.82.114.26'); 
      Ten = packets.filter(packet => packet.TIME > 10.00 && packet.TIME < 11.00 && packet.IP_SRC == '140.82.114.26'); 
      Eleven = packets.filter(packet => packet.TIME > 11.00 && packet.TIME < 12.00 && packet.IP_SRC == '140.82.114.26');
      Twelve = packets.filter(packet => packet.TIME > 12.00 && packet.TIME < 13.00 && packet.IP_SRC == '140.82.114.26');
      Thirteen = packets.filter(packet => packet.TIME > 13.00 && packet.TIME < 14.00 && packet.IP_SRC == '140.82.114.26');
      Fourteen = packets.filter(packet => packet.TIME > 14.00 && packet.TIME < 15.00 && packet.IP_SRC == '140.82.114.26' );
      Fifteen = packets.filter(packet => packet.TIME > 15.00 && packet.TIME < 16.00 && packet.IP_SRC == '140.82.114.26');
      

      
      res.render('index', {ei: Eight.length, ni: Nine.length, te: Ten.length, el: Eleven.length , tw: Twelve.length , thr: Thirteen.length , fr: Fourteen.length , ff:Fifteen.length});
    })
    .catch(err => console.error(err));
});


app.get('/SAP', (req, res) => {
  let Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen;
  Packet.find({})
    .then(packets => {
      
      Eight = packets.filter(packet => packet.TIME > 8.00 && packet.TIME < 9.00 && packet.IP_SRC ==  '195.229.145.123');
      Nine = packets.filter(packet => packet.TIME > 9.00  && packet.TIME < 10.00 && packet.IP_SRC ==  '195.229.145.123'); 
      Ten = packets.filter(packet => packet.TIME > 10.00 && packet.TIME < 11.00 && packet.IP_SRC ==  '195.229.145.123'); 
      Eleven = packets.filter(packet => packet.TIME > 11.00 && packet.TIME < 12.00 && packet.IP_SRC ==  '195.229.145.123');
      Twelve = packets.filter(packet => packet.TIME > 12.00 && packet.TIME < 13.00 && packet.IP_SRC ==  '195.229.145.123');
      Thirteen = packets.filter(packet => packet.TIME > 13.00 && packet.TIME < 14.00 && packet.IP_SRC ==  '195.229.145.123');
      Fourteen = packets.filter(packet => packet.TIME > 14.00 && packet.TIME < 15.00 && packet.IP_SRC ==  '195.229.145.123');
      Fifteen = packets.filter(packet => packet.TIME > 15.00 && packet.TIME < 16.00 && packet.IP_SRC ==  '195.229.145.123');
      

      
      res.render('index', {ei: Eight.length, ni: Nine.length, te: Ten.length, el: Eleven.length , tw: Twelve.length , thr: Thirteen.length , fr: Fourteen.length , ff:Fifteen.length});
    })
    .catch(err => console.error(err));
});

app.get('/aws', (req, res) => {
  let Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen;
  Packet.find({})
    .then(packets => {
      
      Eight = packets.filter(packet => packet.TIME > 8.00 && packet.TIME < 9.00 && packet.IP_SRC == '52.21.91.94');
      Nine = packets.filter(packet => packet.TIME > 9.00  && packet.TIME < 10.00 && packet.IP_SRC == '52.21.91.94'); 
      Ten = packets.filter(packet => packet.TIME > 10.00 && packet.TIME < 11.00 && packet.IP_SRC == '52.21.91.94'); 
      Eleven = packets.filter(packet => packet.TIME > 11.00 && packet.TIME < 12.00 && packet.IP_SRC == '52.21.91.94');
      Twelve = packets.filter(packet => packet.TIME > 12.00 && packet.TIME < 13.00 && packet.IP_SRC == '52.21.91.94');
      Thirteen = packets.filter(packet => packet.TIME > 13.00 && packet.TIME < 14.00 && packet.IP_SRC == '52.21.91.94');
      Fourteen = packets.filter(packet => packet.TIME > 14.00 && packet.TIME < 15.00  && packet.IP_SRC == '52.21.91.94');
      Fifteen = packets.filter(packet => packet.TIME > 15.00 && packet.TIME < 16.00 && packet.IP_SRC == '52.21.91.94');
      

      
      res.render('index', {ei: Eight.length, ni: Nine.length, te: Ten.length, el: Eleven.length , tw: Twelve.length , thr: Thirteen.length , fr: Fourteen.length , ff:Fifteen.length});
    })
    .catch(err => console.error(err));
});


app.get('/goog', (req, res) => {
  let Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen;
  Packet.find({})
    .then(packets => {
      
      
      Eight = packets.filter(packet => packet.TIME > 8.00 && packet.TIME < 9.00 && packet.IP_SRC == '64.233.177.106');
      Nine = packets.filter(packet => packet.TIME > 9.00  && packet.TIME < 10.00 && packet.IP_SRC == '64.233.177.106'); 
      Ten = packets.filter(packet => packet.TIME > 10.00 && packet.TIME < 11.00 && packet.IP_SRC == '64.233.177.106'); 
      Eleven = packets.filter(packet => packet.TIME > 11.00 && packet.TIME < 12.00 && packet.IP_SRC == '64.233.177.106');
      Twelve = packets.filter(packet => packet.TIME > 12.00 && packet.TIME < 13.00 && packet.IP_SRC == '64.233.177.106');
      Thirteen = packets.filter(packet => packet.TIME > 13.00 && packet.TIME < 14.00 && packet.IP_SRC == '64.233.177.106');
      Fourteen = packets.filter(packet => packet.TIME > 14.00 && packet.TIME < 15.00  && packet.IP_SRC == '64.233.177.106');
      Fifteen = packets.filter(packet => packet.TIME > 15.00 && packet.TIME < 16.00 && packet.IP_SRC == '64.233.177.106');
      

      
      res.render('index', {ei: Eight.length, ni: Nine.length, te: Ten.length, el: Eleven.length , tw: Twelve.length , thr: Thirteen.length , fr: Fourteen.length , ff:Fifteen.length});
    })
    .catch(err => console.error(err));
});

app.get('/microsoft', (req, res) => {
  let Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen;
  Packet.find({})
    .then(packets => {
      
      
      Eight = packets.filter(packet => packet.TIME > 8.00 && packet.TIME < 9.00 && packet.IP_SRC == '65.55.44.109');
      Nine = packets.filter(packet => packet.TIME > 9.00  && packet.TIME < 10.00 && packet.IP_SRC == '65.55.44.109' ); 
      Ten = packets.filter(packet => packet.TIME > 10.00 && packet.TIME < 11.00 && packet.IP_SRC == '65.55.44.109' ); 
      Eleven = packets.filter(packet => packet.TIME > 11.00 && packet.TIME < 12.00 && packet.IP_SRC == '65.55.44.109' );
      Twelve = packets.filter(packet => packet.TIME > 12.00 && packet.TIME < 13.00 && packet.IP_SRC == '65.55.44.109');
      Thirteen = packets.filter(packet => packet.TIME > 13.00 && packet.TIME < 14.00 && packet.IP_SRC == '65.55.44.109 ');
      Fourteen = packets.filter(packet => packet.TIME > 14.00 && packet.TIME < 15.00  && packet.IP_SRC == '65.55.44.109 ');
      Fifteen = packets.filter(packet => packet.TIME > 15.00 && packet.TIME < 16.00 && packet.IP_SRC == '65.55.44.109 ');
      

      
      res.render('index', {ei: Eight.length, ni: Nine.length, te: Ten.length, el: Eleven.length , tw: Twelve.length , thr: Thirteen.length , fr: Fourteen.length , ff:Fifteen.length});
    })
    .catch(err => console.error(err));
});

server.listen(port, () => console.log(`App running on port ${port}`));
