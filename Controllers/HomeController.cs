using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StockWatch.Models;

namespace StockWatch.Controllers
{
    public class HomeController : Controller
    {
        private readonly StockWatchContext _context;
        public HomeController(StockWatchContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            var ivm = new IndexViewModel();
            ivm.Stocks = _context.Stocks.Select(s => new Stock { Ticker = s.Ticker }).ToList();
            return View(ivm);
        }
        [HttpPost]
        public IActionResult AddStock(string companyname, string stockticker)
        {
            _context.Stocks.Add(new Stock{ Ticker = stockticker, NameOfCompany = companyname, SharesOwned = 0 });
            _context.SaveChanges();
            return RedirectToAction("Index");
        }
        [HttpGet]
        public IActionResult GetStocks()
        {
            JsonResult data = new JsonResult(_context.Stocks);
            // for(var i = 0; i < _context.Stocks.Count(); i++)
            // {
            //     data.;
            // }

            return data;
        }
        public IActionResult RemoveStock(string ticker)
        {
            _context.Stocks.Remove(_context.Stocks.Where(s => s.Ticker == ticker).FirstOrDefault());
            return RedirectToAction("Index");
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
