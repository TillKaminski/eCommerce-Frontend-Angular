# ECommerceFrontend

### Registrierung
Soll als Startseite der Anwendung dienen. Wenn der Login erfolgreich war, wird je nach Rolle des Nutzers auf die Seite "Nutzer" oder "Mitarbeiter" navigiert. Registrierung fügt neue Nutzer der Datenbank hinzu. Möglichkeit ein Startkapital zu vergeben. Dieses wird im Teil "Mitarbeiter" für die Berechnung der Kontostände einbezogen (kann beim Testen für Verwirrung sorgen).

Login für Demonstration mit Zugriff auf mehrere Nutzerkonten nicht sinnvoll. Button Login für diese Version nicht anwählbar.

### Nutzer

Bereich für Nutzer, in dem Transaktionen ausgeführt werden können. Im oberen Teil befinden sich Schaltflächen, durch die zu einem anderen Nutzerkonto gewechselt werden kann. Dient Testzwecken. Neu registrierte Nutzer werden auch angezeigt.

### Mitarbeiter

Oberfläche für Service-Mitarbeiter, um ausstehende Zahlungen freizuschalten. Filterung/Sortierung sowie Auflistung der Kontostände möglich. Über die Felder "Von:" und "Bis" kann ein Suchzeitraum übergeben werden. Format: "YYYY-MM-DD". Nur wenn beide Felder korrekt befüllt sind werden korrekte Ergebnisse geliefert. Die Angaben "Summe: (Betrag) € Ausstehend: (Betrag) €" beziehen sich auf den angegebenen Zeitraum (keine Angabe Zeitraum = alle Zahlungseinträge). Feld "Nr." bezieht sich auf die Zahlungsreihenfolge der Nutzer.

### Anmerkung/ToDo

- Login und Registrierung provisorisch -> nachbessern
- Weiterleitung nach Login entsprechend der Nutzerrolle
- Nutzerverwaltung: löschen/editieren
- Nutzer: ausstehende Zahlung stornieren, Einzahlung von Wert < 0 entspricht Auszahlung (prüfen)
- weitere Sortiermöglichkeiten
- Transaktionen zwischen Nutzern


- Kommunikation zum Backend über RequestBodies (z.B. Datum-Von und Datum-Bis), Lösung der Endpunkte ist provisorisch
- Passwörter verschlüsseln
- Fehlerbehandlung (z.B. Registrierung wenn Nutzer bereits in DB, keine Verbindung zum BE, ...)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.
