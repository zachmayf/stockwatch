using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StockWatch.Models
{
    public class IndexViewModel
    {
        public IEnumerable<Stock> Stocks { get; set; }
    }
}