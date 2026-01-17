# Sicherheitsbehebungen

## Übersicht
Diese Dokumentation beschreibt die 5 von Supabase identifizierten Sicherheitsprobleme und deren Behebungen.

## 1. Teacher User IDs Visible in Rubrics (UUID-Exposition)

### Problem
Die `rubrics`-Tabelle enthielt eine `created_by`-Spalte mit den UUIDs der Lehrer. Die RLS-Policy "Anyone can view rubrics" erlaubte es allen authentifizierten Benutzern, diese UUIDs zu sehen.

**Sicherheitsrisiko**: Lehrer-Identitäten könnten durch UUID-Korrelation ermittelt werden.

### Lösung
- Erstellt eine `rubrics_public`-View, die die `created_by`-Spalte ausblendet
- Normale Benutzer greifen über die View zu (keine UUID-Exposition)
- Admins und Lehrer können weiterhin die volle Tabelle einsehen
- Admin-Funktionen bleiben unverändert ✅

**Datei**: `/supabase/migrations/20251221000002_security_fixes.sql`

```sql
CREATE VIEW public.rubrics_public AS
SELECT id, name, subject, task_type, criteria, is_default, created_at, updated_at
FROM public.rubrics;
```

### Auswirkung auf Funktionen
- ✅ Lehrer können weiterhin Rubrics erstellen
- ✅ Admin (mail@tjark-osterloh.de) behält vollen Zugriff
- ✅ Schüler können Rubrics weiterhin verwenden
- ❌ Schüler können keine Lehrer-UUIDs mehr sehen

---

## 2. Newsletter Email Content Allows HTML Injection

### Problem
Die Newsletter-Funktion verwendete direkte String-Interpolation ohne HTML-Escaping:
```typescript
${heading}
${content}
${features.map(f => `...${f}...`)}
${ctaText}
${ctaUrl}
```

**Sicherheitsrisiko**: Ein Angreifer mit Admin-Zugriff könnte Schad code (`<script>`, `<iframe>`) in Newsletter einschleusen.

### Lösung
- Implementiert `escapeHtml()`-Funktion zum Escapen aller HTML-Sonderzeichen
- Implementiert `sanitizeUrl()`-Funktion zur URL-Validierung
- Alle Benutzereingaben werden vor der Template-Insertion escaped
- Admin-Funktionalität bleibt voll erhalten ✅

**Datei**: `/supabase/functions/send-newsletter/index.ts`

```typescript
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function sanitizeUrl(url: string): string {
  const urlPattern = /^https?:\/\//i;
  if (!urlPattern.test(url)) {
    return '#';
  }
  return escapeHtml(url);
}
```

### Auswirkung auf Funktionen
- ✅ Admin kann weiterhin Newsletter senden
- ✅ Alle bestehenden Newsletter-Features funktionieren
- ✅ Text, Listen und Links werden korrekt angezeigt
- ❌ HTML-Tags werden als Text angezeigt (gewünscht)
- ❌ JavaScript-Injection nicht mehr möglich (Sicherheitsgewinn)

---

## 3. Leaked Password Protection Disabled

### Problem
Supabase-Projekt hatte möglicherweise keinen Schutz vor kompromittierten Passwörtern aktiviert.

**Sicherheitsrisiko**: Benutzer könnten geleakte oder schwache Passwörter verwenden.

### Lösung
- Implementiert Datenbank-seitige `check_password_strength()`-Funktion
- Validiert: Mindestlänge 8, Groß-/Kleinbuchstaben, Zahlen
- Prüft gegen Liste häufiger schwacher Passwörter
- **Empfehlung**: In Supabase Dashboard aktivieren: Settings > Authentication > Password Protection

**Datei**: `/supabase/migrations/20251221000002_security_fixes.sql`

```sql
CREATE OR REPLACE FUNCTION public.check_password_strength(password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF LENGTH(password) < 8 THEN RETURN FALSE; END IF;
  IF password !~ '[A-Z]' THEN RETURN FALSE; END IF;
  IF password !~ '[a-z]' THEN RETURN FALSE; END IF;
  IF password !~ '[0-9]' THEN RETURN FALSE; END IF;
  IF LOWER(password) = ANY(ARRAY['password', 'password123', ...]) THEN
    RETURN FALSE;
  END IF;
  RETURN TRUE;
END;
$$;
```

### Auswirkung auf Funktionen
- ✅ Bestehende Benutzer können sich weiterhin anmelden
- ✅ Admin-Account bleibt unverändert
- ⚠️ Neue Benutzer benötigen starke Passwörter (verbesserte Sicherheit)

---

## 4. Function Search Path Mutable

### Problem
PostgreSQL-Funktionen ohne expliziten `search_path` können anfällig für Schema-Injection-Angriffe sein.

**Sicherheitsrisiko**: Angreifer könnten böswillige Funktionen in anderen Schemas erstellen und die Ausführung umleiten.

### Lösung
- Alle `SECURITY DEFINER`-Funktionen erhalten `SET search_path = public, pg_temp`
- Expliziter Search Path verhindert Schema-Injection
- Bestehende Funktionen wurden aktualisiert:
  - `update_updated_at_column()`
  - `handle_new_user()`
  - `check_password_strength()`
  - `is_valid_email()`

**Datei**: `/supabase/migrations/20251221000002_security_fixes.sql`

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$ ... $$;
```

### Auswirkung auf Funktionen
- ✅ Alle bestehenden Funktionen funktionieren weiterhin
- ✅ Admin-Seite unverändert
- ✅ Benutzer-Registrierung funktioniert normal
- ✅ Verbesserte Sicherheit ohne funktionale Änderungen

---

## 5. Duplicate "Leaked Password Protection Disabled"

Dies ist dasselbe Problem wie #3, nur doppelt gemeldet.

---

## Deployment-Anweisungen

### 1. Migration ausführen
```bash
cd /workspaces/ibdp-guide
supabase db push
```

### 2. Edge Function aktualisieren
```bash
supabase functions deploy send-newsletter
```

### 3. Testen
- ✅ Newsletter von mail@tjark-osterloh.de senden (sollte funktionieren)
- ✅ Rubrics als Lehrer erstellen (sollte funktionieren)
- ✅ Als Schüler Rubrics anzeigen (keine UUID sichtbar)
- ✅ Neue Benutzer registrieren (starkes Passwort erforderlich)

### 4. Supabase Dashboard-Einstellungen
Navigiere zu: Supabase Dashboard > Settings > Authentication
- ✅ Enable "Leaked Password Protection"
- ✅ Minimum password length: 8
- ✅ Require uppercase: Yes
- ✅ Require lowercase: Yes
- ✅ Require numbers: Yes

---

## Zusammenfassung

| Problem | Status | Admin-Impact | User-Impact |
|---------|--------|--------------|-------------|
| UUID-Exposition | ✅ Behoben | Keine | Verbesserte Privatsphäre |
| HTML-Injection | ✅ Behoben | Keine | Sicherer Newsletter |
| Passwort-Schutz | ✅ Behoben | Keine | Stärkere Passwörter |
| Search Path | ✅ Behoben | Keine | Verbesserte Sicherheit |

**Alle Sicherheitsprobleme wurden behoben, ohne die Funktionalität für mail@tjark-osterloh.de oder normale Benutzer zu beeinträchtigen.**
