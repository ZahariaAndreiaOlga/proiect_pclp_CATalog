namespace proiect_pclp_CATalog.Server.Model
{
    public class CatModel
{
    public int? Id { get; set; }
    public string Name { get; set; }
    public string? Breed { get; set; }
    public int Age { get; set; }
    public string? Sex { get; set; }
    public int Size { get; set; }
    public string? Picture { get; set; }
    public string? VaccinationStatus { get; set; }
    public string? PersonalityTraits { get; set; }
    public bool Adopted { get; set; }
    public string? creationDate { get; set; }
    public string? updatedDate { get; set; }
}
}