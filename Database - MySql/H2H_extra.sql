use grey_goose;
alter table grey_goose.winter_internship modify column sl_no int auto_increment;
ALTER TABLE grey_goose.winter_internship DROP FOREIGN KEY business_codeFK;
ALTER TABLE grey_goose.winter_internship DROP FOREIGN KEY cust_numberFK;

select * from grey_goose.winter_internship where sl_no = 48579;
select * from grey_goose.winter_internship ;
desc grey_goose.winter_internship;
delete from grey_goose.winter_internship where sl_no = 48579;
select * from grey_goose.winter_internship where is_deleted = 1;
SELECT invoice_currency, cust_payment_terms FROM grey_goose.winter_internship where sl_no='1';
select * from grey_goose.winter_internship where doc_id = 1930438491;

SELECT invoice_currency, COUNT(*) FROM grey_goose.winter_internship GROUP BY invoice_currency;
SELECT invoice_currency, COUNT(*) AS TOTAL FROM grey_goose.winter_internship WHERE clear_date BETWEEN "0000-00-00" AND "2020-05-22" GROUP BY invoice_currency;
SELECT MIN(clear_date) FROM grey_goose.winter_internship;
SELECT MAX(clear_date) FROM grey_goose.winter_internship;
SELECT business_code, COUNT(*) AS no_of_cust, SUM(total_open_amount) AS total_open_amount FROM grey_goose.winter_internship WHERE clear_date BETWEEN "0000-00-00" AND "2020-05-22" GROUP BY business_code;
update grey_goose.winter_internship set aging_bucket = "1-2 Days" where sl_no = 3;

select business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, due_in_date, total_open_amount, baseline_create_date, cust_payment_terms where sl_no = 3;

update grey_goose.winter_internship set aging_bucket = "nan1" where doc_id = 140106181 and sl_no = 6;