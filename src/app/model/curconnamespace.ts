export namespace CurconNameSpace{

  export class LinkDto{
    id:	number;
    naam:	string;
    href:	string;
  }

  export class IdLinkDto{
    id:	number;
    href:	string;
  }

  export class HRefDto {
    href: string;
  }

  export class OrganisatieDto{
    id:	number;
    naam:	string;;
    opleidingsProfielen:	HRefDto;
    cursussen:	HRefDto;
    docenten:	HRefDto;
    href:	string;
  }

  export class LeerdoelPostDto {
    naam:	string;
    omschrijving:	string;
    gewicht:	number;
    eindBT:	number;
    eindPS:	number;
    bloomniveau:	number;
  }

  export class ToetsMatrijsToetsElementDto{
    id:	number;
    gewicht:	number;
    beoordelingsElement:	IdLinkDto;
    bloomniveau:	LinkDto;
    href:	string;
  }

  export class OpleidingsProfielDto{
    id:	number;
    naam:	string;
    cohorten:	HRefDto;
    leerlijnen:	HRefDto;
    eindPS:	HRefDto;
    eindBT:	HRefDto;
    href:	string;
  }
  export class OrganisatiePostDto{ // TODO: namespace name {}?
    naam:	string;
  }

  export class EctsToetsVormDto{
    beroepsTaak:	BeroepsTaakDto;
    wetenEcts:	number;
    toepassenEcts:	number;
    tonenEcts:	number;
    doenEcts:	number;
    href:	string;
  }

  export class ArchitectuurLaagDto{
    id:	number;
    naam:	string;
    omschrijving:	string;
  }

  export class BeroepsTaakTypesDto{
    architectuurLagen:	ArchitectuurLaagDto;
    activiteiten:	Array<{ id:	number; naam:	string; omschrijving:	string; }>;
    niveaus: Array<number>;
  }
  export class OpleidingsProfielPostDto{
    naam:	string;
  }

  export class ToetsMatrijsLeerdoelDto{
    id:	number;
    omschrijving:	string;
    eindBT:	LinkDto;
    eindPS:	LinkDto;
    bloomniveau:	LinkDto;
    toetsElementen:	Array<ToetsMatrijsToetsElementDto>;
    href:	string;
  }

  export class ToetsMatrijsToetsDto{
    id:	number;
    naam:	string;
    gewicht:	number;
    millerNiveau:	LinkDto;
    beoordelingsElementen: Array<ToetsMatrijsBeoordelingsElementDto>;
  }

  export class ToetsMatrijsDto{
    id:	number;
    code:	string;
    naam:	string;
    leerdoelen:	Array<ToetsMatrijsLeerdoelDto>;
    toetsen: Array<ToetsMatrijsToetsDto>;
    href:	string;
  }

  export class BeroepsTaakDto{
    id:	number;
    architectuurlaag:	string
    architectuurlaagId:	number;
    activiteit:	string
    activiteitId:	number;
    niveau:	number;
    omschrijving:	string
    href:	string
  }

  export class CursusPostDto {
    code:	string;
    naam:	string;
    periode:	number;
    europeanCredits:	number;
    coordinator:	number;
  }
  export class ToetsPostDto{
    naam:	string;
    omschrijving:	string;
    gewicht:	number;
    millerNiveau:	number;
  }
  export class CursusLeerplanSchemaDto{
    id:	number;
    code:	string;
    naam:	string;
    periode:	number;
    europeanCredits:	number;
    eindBT:	Array<LinkDto>;
    eindPS:	Array<LinkDto>;
    href:	string;
  }
  export class ProfielDto{
    naam:	string;
    ects:	number;
    conformiteitBeroepsTaken:	Array<ConformiteitBeroepsTaakDto>;
    eindPS:	Array<ProfessionalSkillDto>;
    leerlijnen:	Array<LinkDto>;
    href:	string;
  }
  export class LeerplanSchemaDto{
    id:	number;
    naam:	string;
    cohort:	string;
    leerlijnen:	Array<LinkDto>;
    eindPS:	Array<LinkDto>;
    eindBT:	Array<BeroepsTaakDto>;
    cursussen:	Array<CursusLeerplanSchemaDto>;
    href:	string;
  }
  export class ProfessionalSkillTypesDto{
    activiteiten:	Array<ActiviteitDto>;
    niveaus: Array<string>;
  }

  export class DocentPostDto{
    naam:	string;
  }

  export class EctsGewichtNiveauDto{
    niveau:	number;
    cumulatiefEctsGewicht:	number;
  }

  export class BloomNiveauDto{
    id:	number;
    niveau:	string;
    omschrijving:	string;
    href:	string;
  }

  export class ProfessionalSkillDto{
    id:	number;
    code:	string;
    beschrijving:	string;
    niveau:	string;
    href:	string;
  }

  export class EctsBeroepsTaakDto{
    beroepsTaak:	BeroepsTaakDto;
    ects:	number;
    href:	string;
  }

  export class MillerNiveauDto{
    id:	number;
    niveau:	string;
    omschrijving:	string;
    href:	string;
  }

  export class ToetsElementPutDto{
    gewicht:	number;
  }

  export class LeerdoelOverzichtDto{
    id:	number;
    periodeCursus:	number;
    ectsGewicht:	number;
    omschrijving:	string;
    beroepsTaak:	LinkDto;
    professionalSkill:	LinkDto;
    bloomniveau:	LinkDto;
    cursus:	LinkDto;
    trefwoord:	LinkDto;
    href:	string;
  }

  export class BeoordelingsElementPostDto{
    naam:	string;
    omschrijving:	string;
    gewicht:	number;
  }

  export class ToetsElementPostDto{
    gewicht:	number;
    beoordelingsElement:	number;
  }
  export class ConformiteitBeroepsTaakDto{
    beroepsTaak:	BeroepsTaakDto;
    conformiteit:	number;
    opmerking:	string;
    href:	string;
  }

  export class CohortPostDto{
    jaar:	string;
  }

  export class ActiviteitDto{
    id:	number;
    naam:	string;
    omschrijving:	string;
  }

  export class CohortDto{
    id:	number;
    jaar:	string;
    cursussen;
  }

  export class ToetsMatrijsBeoordelingsElementDto{
    id:	number;
    naam:	string;
    omschrijving:	string;
    gewicht:	number;
    href:	string;
  }

  export class ToetsElementDto{
    id:	number;
    gewicht:	number;
    beoordelingsElement:	LinkDto;
    leerdoel:	LinkDto;
    href:	string;
  }

  export class IdPostDto{
    id:	number;
  }


}
