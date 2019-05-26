using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace StockWatch.Models
{
    public class StockWatchContext : DbContext 
    {
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public StockWatchContext(
               DbContextOptions<StockWatchContext> options)
               : base(options){}
    }
    public class Stock
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Ticker { get; set; }
        public string NameOfCompany { get; set; }
        public int SharesOwned { get; set; }
    }
    public class Transaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Stock StockPurchased { get; set; }
        public float PurchasePrice { get; set; }
        public float SellPrice { get; set; }
    }
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public double Balance { get; set; }
        public IEnumerable<Stock> StocksHeld { get; set; }
        public IEnumerable<Transaction> Transactions { get; set; }
    }
}