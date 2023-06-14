﻿using NHibernate.Tool.hbm2ddl;
using NHibernate;
using System.Reflection;
using NHibernate.Cfg;


namespace api.Helpers
{
    public class NHibernateManager
    {
        private static ISessionFactory _sessionFactory;
        private static ISessionFactory CreateSession()
        {
            var configuration = new Configuration();
            configuration.DataBaseIntegration(db =>
            {
                db.ConnectionString = "User Id=super;Password=abcd1234;Data Source=127.0.0.1:1521/XEPDB1";
                db.Driver<NHibernate.Driver.OracleManagedDataClientDriver>();
                db.Dialect<NHibernate.Dialect.Oracle10gDialect>();
                //db.LogSqlInConsole = true;
            });
            configuration.AddAssembly(Assembly.GetExecutingAssembly());

            var schema = new SchemaExport(configuration);
            schema
            .SetOutputFile(@"db.sql")
            .Execute(false, false, false);

            var update = new SchemaUpdate(configuration);
            update.Execute(false, true);

            _sessionFactory = configuration.BuildSessionFactory();
            return _sessionFactory;
        }
        public static ISessionFactory GetSession()
        {
            if (_sessionFactory == null)
            {
                CreateSession();
            }
            return _sessionFactory;
        }
    }
}
