# SQL injection Tutorial

- I choose ExpressJS, MySQL base on popularity

## What it is

- When you try to construct a query base on user input, an intuitive but **unsafe** way is directly embeding the user input into your query.
- This is unsafe because it "mix data with control". There is a loophole that allows the user input become commands that your DB recieves and excutes.
- By a crafty design, a malicious user can make your original query into two or more query and then access what he/she doesn't have right to.

## How to defend agaist it

- One of manjor defence is escaping.
  Any where that is a special character like quote mark `'`, use backslash `\` to escape it so that it remains as a part of text rather than a part of the control.

  - But PHP seems not making it very easy nor reliable for developer. A quote about `mysql_real_escape_string`:

    > `real` because the first one `mysql_escape_string` didn't work and they couldn't change it because of backwards compatibility.

- Another option: prepare statement.
  e.g
  ```javascript
  connection.query(
    "UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?",
    ["a", "b", "c", userId],
    function (error, results, fields) {
      if (error) throw error;
      // ...
    }
  );
  ```

> I think the core idea of these two method are the same: Declare the user input as "data". And make sure the database libary interpret it a parameter in a query. Not allow expending it to a sub-query, which is a control command.

## Build the app (API): the wrong and the right

1. MySQL
   Check this [official guide here](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)
2. start MySQL: `mysqld` in mac.
   > Not sure about windows
3. MySQL GUI tool: recommend SQL Workbench or Sqlectron. Both are pretty good.
4. Copy the existing code
   `git clone https://github.com/hbxz/sec-web-app-sql-injection.git -o injection_demo`

> Also recommend you to play around and try to build it by your own.

5. Run it

> You might be using Mac app "terminal", make sure your "working directory" is correct.

```bash
cd <injection_demo>   # replae <> with the right working directory
npm i                 # installing dependency
node index.js         # run the API server
```

6. Hack it: injection demosntration and practice.

Example: [Running an SQL Injection Attack - Computerphile](https://www.youtube.com/watch?v=ciNHn38EyRc).

This video interactively introduce how you get some sensitive data through SQL injecting a search bar.

- Process summary:
  1. Quickly check vulnerability.
     e.g input `'` and see whether it produce server error.
  2. input `' <your_query_command> --` and try more.
     e.g `' union (select 1,2,3 from dual) --`
     > use `--` to coment out the rest of the original query. Inject your own.
  3. Test and find out which SQL DBMS it is by trying their own keyword and see.
     > In the video, he chose `sleep(2)` to confirm it's MySQL.
     > In my case, I will skip this step cause it's time consuming and not so fun.
  4. read table_name and table_schema from information_schema
     e.g `' union select TABLE_NAME, Table_Schema,3,4,5,6,7 from information_schema.columns --`
  5. read columns name of a table from from information_schema
     e.g `' union select column_name, 0,0,0,0,0,0 from information_schema.columns where table_name = 'customers' --`
  6. read all data base on result from step 5
     e.g `' union select first_name, last_name, birth_date, address, phone, city, state from sql_store.customers --`

7. Fix it: query by the right way
   Replace direct quering string embeding with escaping:

```
const queryString = `select * from employees where first_name like ?`;
connection.query(queryString, [first_name], (error, results, _) => {
  if (error) return next(error);
  res.json({ data: results });
});

```

## Credit and reference:

- Understanding SQL injection: [Tom Scott on SQL Injection](https://youtu.be/_jKylhJtPmI)
- Demo of attacking [running an SQL Injection Attack - Computerphile]()
- Basic SQL [Mosh's SQL course](https://www.youtube.com/watch?v=7S_tz1z_5bA)

```

```
