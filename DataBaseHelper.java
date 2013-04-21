package com.etchickens;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import android.annotation.SuppressLint;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.database.sqlite.SQLiteOpenHelper;

public class DataBaseHelper extends SQLiteOpenHelper {
	 
    @SuppressLint("SdCardPath")
    // Android's default system path of the application database
	private static String DB_PATH = 
	"/data/data/com.etchickens/databases/";
    private String DB_NAME;
 
    /**
     * The database
     */
    private SQLiteDatabase myDataBase;
    
    
    private final Context myContext;
 
    /**
     * Takes and keeps a reference of the passed context in order to access the
     * application assets and resources.
     * 
     * @param context A reference to the app's context.
     * @string dbName The name of the database in the assets folder to access
     */
    public DataBaseHelper(Context context, String dbName) {
    	super(context, dbName, null, 1);
        this.myContext = context;
        this.DB_NAME = dbName;
    }
 
  /**
    * Creates a empty database on the system and rewrite it with the
    * dictionary data.
    */
    public void createDataBase() throws IOException{
 
    	boolean dbExist = checkDataBase();
 
    	if(dbExist){
    		// Database already exists
    	} else {
    		// Create an empty database in the default path and overwrite it
        	this.getReadableDatabase();
        	try {
    			copyDataBase();
    		} catch (IOException e) {
        		throw e;
        	}
    	}
    }
 
    /**
     * Check if the database already exist to avoid re-copying the database
     * upon opening the app.
     * 
     * @return true if the database exists
     */
    private boolean checkDataBase(){
    	SQLiteDatabase checkDB = null;
 
    	try{
    		String myPath = DB_PATH + DB_NAME;
    		checkDB = SQLiteDatabase.openDatabase(myPath, null, 
    				SQLiteDatabase.NO_LOCALIZED_COLLATORS | 
    				SQLiteDatabase.OPEN_READONLY);
 
    	}catch(SQLiteException e){
    		//database does't exist yet.
    	}
 
    	if(checkDB != null){
    		checkDB.close();
    	}
 
    	return checkDB != null ? true : false;
    }
 
    /**
     * Copies your database from the local assets-folder to the newly created
     * empty database in the system folder, from where it is be accessed and
     * handled.
     * This is done via transferring bytestream.
     * @throws IOException
     */
    private void copyDataBase() throws IOException{
 
    	// Open your local db as the input stream
    	InputStream myInput = myContext.getAssets().open(DB_NAME);
 
    	// Path to the just created empty db
    	String outFileName = DB_PATH + DB_NAME;
 
    	// Open the empty db as the output stream
    	OutputStream myOutput = new FileOutputStream(outFileName);
 
    	// transfer bytes from the inputfile to the outputfile
    	byte[] buffer = new byte[1024];
    	int length;
    	while ((length = myInput.read(buffer))>0){
    		myOutput.write(buffer, 0, length);
    	}
 
    	// Close streams
    	myOutput.flush();
    	myOutput.close();
    	myInput.close();
 
    }
 
    /**
     * Opens the database so that it may be queried.
     * @throws SQLException
     */
    public void openDataBase() throws SQLException{
    	//Open the database
        String myPath = DB_PATH + DB_NAME;
    	myDataBase = SQLiteDatabase.openDatabase
    			(myPath, null, SQLiteDatabase.NO_LOCALIZED_COLLATORS | 
    					SQLiteDatabase.OPEN_READONLY);
    }
 
    @Override
	public synchronized void close() {
    	    if(myDataBase != null)
    		    myDataBase.close();
    	    super.close();
	}
 
	@Override
	public void onCreate(SQLiteDatabase db) {
	}
 
	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
	}
	
	/**
	 * Returns a list of words matching given criteria.
	 * @param key The pattern for words to match.
	 * @param rhyme The word for the words to rhyme with ("" if none)
	 * @return An String containing the words that match the criteria, or if
	 * no words match, a message describing what went wrong.
	 */
	public String getWords(String key, String rhyme) {
		StringBuilder result = new StringBuilder();
		Cursor cursor;
		
		cursor = myDataBase.rawQuery("SELECT fullWord FROM '" + key + 
					"' WHERE _id >= ? ", new String[] {Integer.toString(0)});

		if (cursor != null && cursor.moveToFirst()) {
			while (!cursor.isAfterLast()) {
				result.append(cursor.getString(0) + "\n");
				cursor.moveToNext();
			}
		}
		cursor.close();
		return result.toString();
	}
	
	
	/** 
	 * Returns the rhyme ID of the word.
	 * Note: to be used only on the database reading the wordList.db file.
	 * @param word The word to get data about.
	 * @return A string with the rhyme ID, or "-1" if the word isn't present.
	 **/
	public String getRhymeId(String word) {
		String result = "-1";
		Cursor cursor = myDataBase.rawQuery("SELECT rhyme FROM allWords " +
				"WHERE fullWord = ?", new String[] {word});
		if (cursor.moveToFirst()) {
			result = cursor.getString(0);
		}
		cursor.close();
		return result;
	}
	
	/**
	 * Return true if tableName exists in myDataBase.
	 * @param tableName The name to check.
	 * @param openDb True if the database needs to be opened.
	 * @return True if tableName exists in the database.
	 */
	public boolean tableExists(String tableName, boolean openDb) {
	    if(openDb) {
	        if(myDataBase == null || !myDataBase.isOpen()) {
	            myDataBase = getReadableDatabase();
	        }

	        if(!myDataBase.isReadOnly()) {
	            myDataBase.close();
	            myDataBase = getReadableDatabase();
	        }
	    }

	    Cursor cursor = myDataBase.rawQuery("SELECT DISTINCT tbl_name FROM " +
	    		"sqlite_master WHERE tbl_name = '" + tableName + "'", null);
	    if(cursor != null) {
	        if(cursor.getCount() > 0) {
	            cursor.close();
	            return true;
	        }
	    }
	    cursor.close();
	    return false;
	}
}