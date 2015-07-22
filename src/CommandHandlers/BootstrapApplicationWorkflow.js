/**
 * Created by parallels on 7/16/15.
 */

module.exports = function(gesEventHandlerBase, gesRepository, gesclient, readModelRepository, sqlScripts, fs, uuid, config, logger) {
    return class BootstrapApplicationWorkflow extends gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['bootstrapApplication'];
            this.eventHandlerName = 'BootstrapApplicationWorkflow';
            logger.info('BootstrapApplicationWorkflow started up');
        }

        bootstrapApplicationloginTrainer(vnt) {
            this.setMetadata();
            this.hireTrainer();
            this.buildDb();
            this.addStates();
        }

        setMetadata() {
            var setData = {
                expectedMetastreamVersion: -1
                , metadata: gesclient.createStreamMetadata({
                    acl: {
                        readRoles: gesclient.systemRoles.all
                    }
                })
                , auth: {
                    username: config.get('eventstore.systemUsers.admin')
                    , password: config.get('eventstore.AdminPassword')
                }
            };

            gesConnection.setStreamMetadata('$all', setData)
        }

        hireTrainer() {
            var trainer = new Trainer();
            trainer.hireTrainer({});
            gesRepository.save(trainer);
        }

        buildDb(){
            var pgb = new pgbluebird();
            var cnn;
            var path = '../sql/methodFitness.sql/';
            pgb.connect(config.get('postgress.connectionString'))
                .then(function (connection) {
                    cnn = connection;
                    var script = fs.reqdFileSync(Path.join(path,'dropMethodFitnessDB.sql'));
                    return pg.client.query(script);
                })
                .then(function(res){
                    //create role
                    var script = fs.reqdFileSync(Path.join(path,'createRole.sql'));
                    return pg.client.query(script);
                })
                .then(function(res){
                    //create db
                    var script = fs.reqdFileSync(Path.join(path,'createMethodFitnessDb.sql'));
                    return pg.client.query(script);
                })
                .finally(function() {
                    cnn.done();
                });
        }

        addStates(){
            var script = "begin; "+
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'AK', Name:'Alaska'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'AZ', Name:'Arizona'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'AR', Name:'Arkansas'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'CA', Name:'California'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'CO', Name:'Colorado'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'CT', Name:'Connecticut'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'DE', Name:'Delaware'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'DC', Name:'District Of Columbia'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'FL', Name:'Florida'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'GA', Name:'Georgia'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'HI', Name:'Hawaii'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'ID', Name:'Idaho'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'IL', Name:'Illinois'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'IN', Name:'Indiana'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'IA', Name:'Iowa'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'KS', Name:'Kansas'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'KY', Name:'Kentucky'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'LA', Name:'Louisiana'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'ME', Name:'Maine'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'MD', Name:'Maryland'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'MA', Name:'Massachusetts'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'MI', Name:'Michigan'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'MN', Name:'Minnesota'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'MS', Name:'Mississippi'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'MO', Name:'Missouri'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'MT', Name:'Montana'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'NE', Name:'Nebraska'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'NV', Name:'Nevada'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'NH', Name:'New Hampshire'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'NJ', Name:'New Jersey'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'NM', Name:'New Mexico'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'NY', Name:'New York'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'NC', Name:'North Carolina'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'ND', Name:'North Dakota'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'OH', Name:'Ohio'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'OK', Name:'Oklahoma'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'OR', Name:'Oregon'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'PA', Name:'Pennsylvania'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'RI', Name:'Rhode Island'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'SC', Name:'South Carolina'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'SD', Name:'South Dakota'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'TN', Name:'Tennessee'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'TX', Name:'Texas'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'UT', Name:'Utah'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'VT', Name:'Vermont'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'VA', Name:'Virginia'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'WA', Name:'Washington'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'WV', Name:'West Virginia'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'WI', Name:'Wisconsin'}, );" +
                "insert into states (id, document) values ("+uuid.v4()+", {Code:'WY', Name:'Wyoming'} );" +
                "commit;";

            var pgb = new pgbluebird();
            var cnn;
            pgb.connect(config.get('postgress.connectionString'))
                .then(function (connection) {
                    cnn = connection;
                    pg.client.query(script);
                })
                .finally(function() {
                    cnn.done();
                });
        }
    }
};